import { BaseBoxSection } from './BaseBoxSection.js'
import { Box3 } from 'three'

/**
 * Object's box section
 **/
export class ObjectsBoxSection extends BaseBoxSection {
  /**
   * Constructor
   */
  constructor(objectsUuids, scene, camera, renderer, controls) {
    super(scene, camera, renderer, controls)
    // basic member data
    this.objectUuids = objectsUuids
    const box3 = new Box3()
    this.objectUuids.forEach((uuid) => {
      const object = this.scene.getObjectByProperty('uuid', uuid)
      object && box3.expandByObject(object) // gets object's bounding box
    })
    box3.expandByScalar(1.5) // expand bounding box a bit
    super.setSectionBox(box3)
  }

  /**
   * Initialize 6 section plane
   **/
  initPlanes() {
    super.initPlanes()
    this.objectUuids.forEach((uuid) => {
      const object = this.scene.getObjectByProperty('uuid', uuid)
      object &&
        object.traverse((child) => {
          if (['Mesh', 'LineSegments'].includes(child.type)) {
            child.material.clippingPlanes = this.planes
            // clipIntersection is false by default, but it may changed by other section (ObjectsPlaneClipper, etc.)
            // so, need to set it back here
            child.material.clipIntersection = false
          }
        })
    })
  }

  /**
   * Clears section box
   **/
  clearSectionBox() {
    super.clearSectionBox()
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
