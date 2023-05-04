import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import Blob from "./Blob";
import { initialBlobs } from "./CelestialConfig";

const CELESTIAL_BODY_PARAMS = {
  clearColor: "#07001c",
};

export class CelestialBody {
  constructor(dom) {
    this.dom = dom
    this.onResize = this.onResize.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.animate = this.animate.bind(this);

    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initPostProcessing();

    window.addEventListener("resize", this.onResize);
    window.addEventListener("keydown", this.onKeyDown);

    this.blobs = [];

    initialBlobs.forEach((options) => {
      this.addBlob(options);
    });
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.dom,
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);

    this.clearColor = new THREE.Color(CELESTIAL_BODY_PARAMS.clearColor);
    this.renderer.setClearColor(this.clearColor, 0);

    if (
      this.renderer.capabilities.isWebGL2 === false &&
      this.renderer.extensions.get("ANGLE_instanced_arrays") === null
    ) {
      document.getElementById("notSupported").style.display = "";
      return false;
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    this.camera.position.z = 2000;
    new OrbitControls(this.camera, this.renderer.domElement);
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);

    this.bloomPass = new UnrealBloomPass({
      resolution: new THREE.Vector2( this.dom.clientWidth, this.dom.clientHeight ),
      threshold: 0.18,
      strength: 0.5,
      radius: 2,

    });

    // this.bloomPass = new UnrealBloomPass({
    //   luminanceThreshold: 0.18,
    //   luminanceSmoothing: 0.087,
    //   resolutionScale: 0.5,
    //   intensity: 1.0,
    // });

    // this.vignetteEffect = new VignetteEffect({
    //   offset: 0,
    //   darkness: 0.35,
    // });
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  onKeyDown(e) {
    if (e.keyCode === 68) {
      this.gui.hidden = !this.gui.hidden;
      document.querySelector(".js-info").classList.toggle("hidden");
    }
  }

  addBlob(options) {
    const blob = new Blob({
      gui: this.guiBlobFolder,
      id: this.blobs.length + 1,
      ...options,
    });

    this.scene.add(blob);
    this.blobs.push(blob);
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.blobs.forEach((blob, i) => {
      blob.update();
      if (blob.isDead) {
        this.blobs.splice(i, 1);
      }
    });

    this.composer.render();
  }
}


