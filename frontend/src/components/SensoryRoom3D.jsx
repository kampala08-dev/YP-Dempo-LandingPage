import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ------------------------------------------------------------------ *
 * SensoryRoom3D — a live WebGL visualization of a pediatric SENSORY
 * INTEGRATION room, used as the Hero BACKGROUND layer (hero copy sits
 * on top). Soft, warm, YAMET palette: a therapy swing, ball pit,
 * therapy ball, soft climbing blocks, a crawl tunnel, stepping stones,
 * floating sensory balls, and the child (real transparent photo) as
 * the focal subject. Gentle idle motion + mouse parallax (no clicks
 * intercepted). Craft inspired by oryzo.ai / Lusion. Renders nothing
 * on mobile / reduced-motion / no-WebGL (Hero shows its 2D visual).
 * ------------------------------------------------------------------ */

const CHILD_SRC = "/u-4-tahun.webp";
const CHILD_RATIO = 0.747;

function createScene(canvas) {
    const COL = {
        teal: new THREE.Color("#3A868F"),
        tealL: new THREE.Color("#5BA9B3"),
        teal50: new THREE.Color("#E3F2F6"),
        peach: new THREE.Color("#FFB5A7"),
        peachD: new THREE.Color("#FF9E8C"),
        peach50: new THREE.Color("#FFE9E3"),
        cream: new THREE.Color("#FDFBF7"),
        white: new THREE.Color("#FFFFFF"),
        yellow: new THREE.Color("#F4C20D"),
        red: new THREE.Color("#E8462A"),
        green: new THREE.Color("#4CAF3E"),
        blue: new THREE.Color("#2E80C9"),
    };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = COL.cream.clone();
    scene.fog = new THREE.Fog(COL.cream.clone(), 18, 50);

    const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 200);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe8f1f2, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-6, 12, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024); // cukup untuk latar belakang, separuh beban GPU
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 60;
    key.shadow.camera.left = -20;
    key.shadow.camera.right = 20;
    key.shadow.camera.top = 20;
    key.shadow.camera.bottom = -20;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff3ee, 0.4);
    fill.position.set(8, 5, 6);
    scene.add(fill);

    function glossy(color, opts = {}) {
        return new THREE.MeshPhysicalMaterial(
            Object.assign(
                { color, roughness: 0.28, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.3, envMapIntensity: 0.5, sheen: 0.3, sheenColor: new THREE.Color("#ffffff") },
                opts
            )
        );
    }
    function matte(color, rough = 0.85) {
        return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
    }
    function box(w, h, d, color, r = 0.18) {
        const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, Math.min(w, h, d) * r), glossy(color));
        m.castShadow = m.receiveShadow = true;
        return m;
    }
    function ball(rad, color) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(rad, 36, 36), glossy(color));
        m.castShadow = m.receiveShadow = true;
        return m;
    }

    // ---- room shell ----
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), matte(COL.cream, 0.95));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(80, 30), matte(COL.teal50, 1));
    backWall.position.set(0, 15, -12);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), matte(COL.teal50.clone().lerp(COL.cream, 0.4), 1));
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.set(-16, 15, 0);
    sideWall.receiveShadow = true;
    scene.add(sideWall);

    // soft rug
    const rug = new THREE.Mesh(new THREE.CircleGeometry(6.2, 48), matte(COL.peach50, 1));
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(1.6, 0.02, 1.2);
    rug.receiveShadow = true;
    scene.add(rug);

    // ---- therapy (platform) swing ----
    const swing = new THREE.Group();
    const seat = box(2.0, 0.32, 1.3, COL.peach, 0.3);
    seat.position.y = 1.5;
    swing.add(seat);
    [[-0.85, -0.5], [0.85, -0.5], [-0.85, 0.5], [0.85, 0.5]].forEach(([x, z]) => {
        const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 5.2, 10), matte(COL.tealL, 0.6));
        rope.position.set(x, 1.5 + 2.6, z);
        rope.castShadow = true;
        swing.add(rope);
    });
    swing.position.set(5.4, 0, -1.0);
    scene.add(swing);

    // ---- big therapy ball ----
    const therapyBall = ball(1.0, COL.blue);
    therapyBall.position.set(-0.6, 1.0, 2.4);
    scene.add(therapyBall);

    // ---- ball pit (open container + colorful balls) ----
    const pit = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.9, 40, 1, true), glossy(COL.teal50));
    ring.material.side = THREE.DoubleSide;
    ring.position.y = 0.45;
    ring.castShadow = ring.receiveShadow = true;
    pit.add(ring);
    const pitBottom = new THREE.Mesh(new THREE.CircleGeometry(2.0, 40), matte(COL.cream, 0.9));
    pitBottom.rotation.x = -Math.PI / 2;
    pitBottom.position.y = 0.05;
    pit.add(pitBottom);
    const pitCols = [COL.red, COL.yellow, COL.green, COL.blue, COL.peach, COL.white];
    for (let i = 0; i < 22; i++) {
        const b = ball(0.34, pitCols[i % pitCols.length]);
        const a = (i * 2.39996);
        const rr = 1.5 * Math.sqrt(((i * 53) % 100) / 100);
        b.position.set(Math.cos(a) * rr, 0.34 + ((i * 29) % 4) * 0.18, Math.sin(a) * rr);
        pit.add(b);
    }
    pit.position.set(6.4, 0, 1.6);
    scene.add(pit);

    // ---- soft climbing blocks + wedge ----
    const blocks = new THREE.Group();
    const b1 = box(1.4, 1.4, 1.4, COL.blue);
    b1.position.set(0, 0.7, 0);
    blocks.add(b1);
    const b2 = box(1.2, 1.2, 1.2, COL.yellow);
    b2.position.set(1.3, 0.6, 0.3);
    blocks.add(b2);
    // wedge (ramp)
    const wedgeGeo = new THREE.BoxGeometry(1.6, 1.0, 1.4);
    wedgeGeo.translate(0, 0.5, 0);
    const posAttr = wedgeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        if (posAttr.getY(i) > 0.9 && posAttr.getX(i) > 0) posAttr.setY(i, 0.04); // slope down on +x
    }
    wedgeGeo.computeVertexNormals();
    const wedge = new THREE.Mesh(wedgeGeo, glossy(COL.red));
    wedge.castShadow = wedge.receiveShadow = true;
    wedge.position.set(2.6, 0, -0.6);
    blocks.add(wedge);
    blocks.position.set(-3.4, 0, -1.8);
    scene.add(blocks);

    // ---- crawl tunnel ----
    const tunnel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 3.2, 28, 1, true),
        glossy(COL.tealL, { clearcoatRoughness: 0.4 })
    );
    tunnel.material.side = THREE.DoubleSide;
    tunnel.rotation.z = Math.PI / 2;
    tunnel.position.set(-1.0, 1.2, -3.6);
    tunnel.castShadow = tunnel.receiveShadow = true;
    scene.add(tunnel);

    // ---- stepping stones (balance) ----
    const stones = new THREE.Group();
    const stoneCols = [COL.red, COL.yellow, COL.green, COL.blue, COL.peach];
    for (let i = 0; i < 5; i++) {
        const s = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.28, 28), glossy(stoneCols[i]));
        s.position.set(-2.4 + i * 1.35, 0.14, 3.4 - (i % 2) * 0.5);
        s.castShadow = s.receiveShadow = true;
        stones.add(s);
    }
    scene.add(stones);

    // ---- slide (perosotan) ----
    function cyl(r, h, color) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 20), glossy(color));
        m.castShadow = m.receiveShadow = true;
        return m;
    }
    const slide = new THREE.Group();
    const sPlat = box(1.8, 0.35, 1.8, COL.blue);
    sPlat.position.set(0, 2.0, 0);
    slide.add(sPlat);
    [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]].forEach(([x, z]) => {
        const leg = cyl(0.11, 2.0, COL.tealL);
        leg.position.set(x, 1.0, z);
        slide.add(leg);
    });
    // sloped chute + side rails
    const chute = box(1.3, 0.22, 3.6, COL.yellow, 0.12);
    chute.position.set(0, 1.05, 1.9);
    chute.rotation.x = -0.52;
    slide.add(chute);
    [-0.62, 0.62].forEach((x) => {
        const rail = box(0.18, 0.42, 3.6, COL.red, 0.28);
        rail.position.set(x, 1.28, 1.9);
        rail.rotation.x = -0.52;
        slide.add(rail);
    });
    // climbing steps up the back
    [0, 1, 2].forEach((i) => {
        const step = box(1.5, 0.18, 0.5, COL.peach, 0.28);
        step.position.set(0, 0.55 + i * 0.5, -0.95 - i * 0.42);
        slide.add(step);
    });
    slide.position.set(1.1, 0, -0.6);
    slide.rotation.y = -0.45;
    scene.add(slide);

    // ---- climbing wall (panjat tebing anak) ----
    const climb = new THREE.Group();
    const panel = box(2.8, 3.6, 0.45, COL.teal, 0.06);
    panel.position.set(0, 1.9, 0);
    climb.add(panel);
    const holdCols = [COL.red, COL.yellow, COL.green, COL.blue, COL.peach];
    let hi = 0;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
            const hold = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), glossy(holdCols[hi % holdCols.length]));
            hold.position.set(-1.0 + col * 1.0 + (row % 2) * 0.25, 0.55 + row * 0.78, 0.3);
            hold.castShadow = true;
            climb.add(hold);
            hi++;
        }
    }
    // soft crash mat at the base
    const cmat = box(3.4, 0.3, 1.5, COL.peach, 0.28);
    cmat.position.set(0, 0.15, 0.9);
    climb.add(cmat);
    climb.position.set(6.1, 0, -2.6);
    climb.rotation.y = -0.5;
    scene.add(climb);

    // ---- floating sensory balls (parallax) ----
    const floaters = [];
    const fCols = [COL.red, COL.yellow, COL.green, COL.blue, COL.teal];
    for (let i = 0; i < 7; i++) {
        const b = ball(0.3 + ((i * 17) % 5) / 14, fCols[i % fCols.length]);
        b.position.set(2 + ((i * 53) % 7), 3.5 + ((i * 29) % 6), -4 - ((i * 13) % 5));
        b.userData = { phase: i, bob: 0.5 + ((i * 11) % 6) / 10, spin: 0.1 + ((i * 7) % 8) / 30 };
        scene.add(b);
        floaters.push(b);
    }

    // ---- the child (focal subject) ----
    const childGroup = new THREE.Group();
    const childH = 3.7;
    const tex = new THREE.TextureLoader().load(CHILD_SRC);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 1;
    const childMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(childH * CHILD_RATIO, childH),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, alphaTest: 0.02 })
    );
    childMesh.position.y = childH / 2;
    childMesh.renderOrder = 5;
    childGroup.add(childMesh);

    // contact shadow under child
    function shadowTex() {
        const s = 256;
        const cv = document.createElement("canvas");
        cv.width = cv.height = s;
        const cx = cv.getContext("2d");
        const g = cx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(31,51,62,0.4)");
        g.addColorStop(0.6, "rgba(31,51,62,0.15)");
        g.addColorStop(1, "rgba(31,51,62,0)");
        cx.fillStyle = g;
        cx.fillRect(0, 0, s, s);
        const t = new THREE.CanvasTexture(cv);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
    }
    const childShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(childH * 0.95, childH * 0.5),
        new THREE.MeshBasicMaterial({ map: shadowTex(), transparent: true, depthWrite: false })
    );
    childShadow.rotation.x = -Math.PI / 2;
    childShadow.position.y = 0.03;
    childShadow.renderOrder = 1;
    childGroup.add(childShadow);
    childGroup.position.set(3.4, 0, 2.3);
    scene.add(childGroup);

    // ---- camera framing (room opens to the right, copy sits over the left) ----
    const baseCam = new THREE.Vector3(-1.4, 4.0, 10.6);
    const baseTarget = new THREE.Vector3(2.8, 1.9, 0.9);
    let px = 0;
    let py = 0; // smoothed pointer parallax (-1..1)
    let tpx = 0;
    let tpy = 0;
    const clock = new THREE.Clock();
    const camPos = new THREE.Vector3();
    const camTarget = new THREE.Vector3();

    function frame() {
        const t = clock.getElapsedTime();
        px += (tpx - px) * 0.05;
        py += (tpy - py) * 0.05;

        camPos.copy(baseCam);
        camPos.x += px * 1.6 + Math.sin(t * 0.25) * 0.25;
        camPos.y += -py * 0.9 + Math.sin(t * 0.32) * 0.18;
        camera.position.copy(camPos);
        camTarget.copy(baseTarget);
        camTarget.x += px * 0.7;
        camTarget.y += -py * 0.4;
        camera.lookAt(camTarget);

        // child gently faces the camera (billboard on Y)
        const dx = camera.position.x - childGroup.position.x;
        const dz = camera.position.z - childGroup.position.z;
        childGroup.rotation.y = Math.atan2(dx, dz) * 0.5;

        // gentle life
        therapyBall.rotation.y = t * 0.2;
        swing.children[0].rotation.z = Math.sin(t * 0.8) * 0.04;
        swing.children[0].position.x = Math.sin(t * 0.8) * 0.12;
        floaters.forEach((b) => {
            const u = b.userData;
            b.position.y += Math.sin(t * 1.1 + u.phase) * 0.004 * u.bob;
            b.rotation.y = t * u.spin;
        });

        renderer.render(scene, camera);
    }

    function resize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    }

    function dispose() {
        scene.traverse((o) => {
            if (o.isMesh) {
                o.geometry?.dispose?.();
                const mats = Array.isArray(o.material) ? o.material : [o.material];
                mats.forEach((m) => {
                    m?.map?.dispose?.();
                    m?.dispose?.();
                });
            }
        });
        envRT?.texture?.dispose?.();
        pmrem.dispose();
        renderer.dispose();
    }

    return {
        frame,
        resize,
        dispose,
        setPointer: (nx, ny) => { tpx = nx; tpy = ny; },
    };
}

export default function SensoryRoom3D() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let api;
        try {
            api = createScene(canvas);
        } catch (e) {
            return;
        }
        api.resize();

        let raf = 0;
        let visible = true;
        const loop = () => {
            api.frame();
            raf = requestAnimationFrame(loop);
        };
        const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
        const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

        const onMove = (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            api.setPointer(nx, ny);
        };
        window.addEventListener("pointermove", onMove);

        const onResize = () => api.resize();
        window.addEventListener("resize", onResize);

        const io = new IntersectionObserver(
            (es) => {
                visible = es[0].isIntersecting;
                visible ? start() : stop();
            },
            { threshold: 0 }
        );
        io.observe(canvas);

        const onVis = () => (document.hidden ? stop() : visible && start());
        document.addEventListener("visibilitychange", onVis);
        start();

        return () => {
            stop();
            io.disconnect();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVis);
            api.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
