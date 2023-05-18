import { BasePlaneSection } from './BasePlaneSection.js'
import { Box3 } from 'three'

/**
 * Objects' plane section
 **/
export class ObjectsPlaneSection extends BasePlaneSection {
  /**
   * Constructor
   */
  constructor(objectUuids, scene, camera, renderer, controls) {
    super(scene, camera, renderer, controls)
    // basic member data
    this.objectUuids = objectUuids
    const box3 = new Box3()
    this.objectUuids.forEach((uuid) => {
      const object = this.scene.getObjectByProperty('uuid', uuid)
      object && box3.expandByObject(object) // gets object's bounding box
    })
    box3.expandByScalar(1.5) // expand bounding box a bit
    super.setSectionPlane(box3)
  }

  /**
   * Initialize 6 section plane
   **/
  initSectionPlane() {
    super.initSectionPlane()
    this.objectUuids.forEach((uuid) => {
      const object = this.scene.getObjectByProperty('uuid', uuid)
      object &&
        object.traverse((child) => {
          if (['Mesh', 'LineSegments'].includes(child.type)) {
            child.material.clippingPlanes = this.planes
            // Reference: https://www.cnblogs.com/xiaxiangx/p/13873037.html
            child.material.clipIntersection = true
          }
        })
    })
  }

  /**
   * Clears section plane
   **/
  clearSectionPlane() {
    super.clearSectionPlane()
    this.objectUuids.forEach((uuid) => {
      const object = this.scene.getObjectByProperty('uuid', uuid)
      object &&
        object.traverse((child) => {
          if (['Mesh', 'LineSegments'].includes(child.type)) {
            child.material.clippingPlanes = []
          }
        })
    })
  }
}
