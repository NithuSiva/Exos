window.addEventListener("deviceorientation", handleOrientation, true);

let panorama, viewer;

panorama = new PANOLENS.ImagePanorama( 'asset/first.jpeg' );

viewer = new PANOLENS.Viewer({
        container: document.body,        // A DOM Element container
        controlBar: true,             // Vsibility of bottom control bar
        controlButtons: [],            // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
        autoHideControlBar: false,        // Auto hide control bar
        autoHideInfospot: true,            // Auto hide infospots
        horizontalView: false,            // Allow only horizontal camera control
        cameraFov: 60,                // Camera field of view in degree
        reverseDragging: false,            // Reverse orbit control direction
        enableReticle: false,            // Enable reticle for mouseless interaction
        dwellTime: 1500,            // Dwell time for reticle selection in millisecond
        autoReticleSelect: true,        // Auto select a clickable target after dwellTime
        viewIndicator: false,            // Adds an angle view indicator in upper left corner
        indicatorSize: 30,            // Size of View Indicator
        output: 'console'            // Whether and where to output infospot position. Could be 'console' or 'overlay'
    });
viewer.add( panorama );

let camera =  new THREE.PerspectiveCamera( viewer.cameraFov, document.body.clientWidth / document.body.clientHeight, 1, 10000 );

window.addEventListener("keydown", (e) => {
        console.log(e.code);
        switch(e.code){
            case "ArrowLeft":
                camera.position.x-=10;
                break;
            case "ArrowRight":
                camera.position.x+=10;
                break;
            case "ArrowDown":
                camera.position.z+=10;
                break;
            case "ArrowUp":
                camera.position.z-=10;
                break;
        }
    });


function handleOrientation(event) {
    //let absolute = event.absolute;
    
    let x = event.beta,  y = event.gamma; 
    
    if (x >  90) { x =  90};
    if (x < -90) { x = -90};


    x += 90;
    y += 90;
   /*
    let alpha    = event.alpha;
    let beta     = event.beta;
    let gamma    = event.gamma;
    */

   camera.position.x = x;
   camera.position.y = y;

}



