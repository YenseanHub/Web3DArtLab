import { BasePlaneSection } from './BasePlaneSection.js'

/**
 * GlobalPlaneSection section
 */
export class GlobalPlaneSection extends BasePlaneSection {
  /**
   * Constructor
   */
  constructor(sectionBox, scene, camera, renderer, controls) {
    super(scene, camera, renderer, controls)
    super.setSectionPlane(sectionBox)
  }

  /**
   * Initialize section box
   */
  initSectionPlane() {
    super.initSectionPlane()
    // there are 6 planes, while, only use the upper one as global section plane
    this.renderer.clippingPlanes = [this.planes[0]]
  }

  /**
   * Updates planes for section plane
   */
  updatePlanes() {
    super.updatePlanes()
    // for global section, make the constant a little bit bigger, so that the plan lines itself won't be clipped :)
    const constant = this.planes[0].constant
    this.planes[0].constant = constant + 0.1
  }

  /**
   * Clears section planes
   */
  clearSectionPlane() {
    super.clearSectionPlane()
    this.renderer.clippingPlanes = []
  }
}
