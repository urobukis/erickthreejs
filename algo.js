const dragControls = new DragControls(objects, camera, renderer.domElement)
  
// create variables to hold starting vector and selected object
let startPos
let selected
// max distance between start and end vectors
const maxDistance = 500

// check vector difference on mouseup
renderer.domElement.addEventListener("mouseup", function() {
  if (selected && startPos) {
    console.log('distance', Math.abs(startPos.distanceTo(selected.position)))
    if (Math.abs(startPos.distanceTo(selected.position)) > maxDistance) {
      selected.position.copy(startPos)
    }
  }
  selected = null
});

// set startPos and selected on mousedown
renderer.domElement.addEventListener("mousedown", function(event) {
  event.preventDefault();

  var rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(objects);
          if(intersects.length > 0) {
              selected = intersects[0].object;
              startPos = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z)
              console.log('startPos',{...startPos})
          }
});