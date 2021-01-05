
let panorama, panorama2, viewer;

panorama = new PANOLENS.ImagePanorama( 'asset/first.jpeg' );

panorama2 = new PANOLENS.ImagePanorama( 'asset/second.jpeg' );


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




let control = viewer.getControl();

let hotspot1P1 = new PANOLENS.Infospot(350,PANOLENS.DataImage.Info );
hotspot1P1.position.set(-8000, 50, -5000 );
hotspot1P1.addHoverElement( document.getElementById('1'),100);    

let hotspot2P1 = new PANOLENS.Infospot(350,PANOLENS.DataImage.Info );
hotspot2P1.position.set( 5500, 5, -5400 );
hotspot2P1.addHoverElement( document.getElementById('audio1'),50); 

let hotspot1P2 = new PANOLENS.Infospot(350,PANOLENS.DataImage.Info );
hotspot1P2.position.set( 0, 0, -5000 );
hotspot1P2.addHoverElement( document.getElementById('2'),300);    
/*
let hotspot2P2 = new PANOLENS.Infospot(350,PANOLENS.DataImage.Info );
hotspot2P2.position.set( 5000, 0, 5000 );
hotspot2P2.addHoverElement( document.getElementById('link'),100); 
*/

viewer.add(panorama);
viewer.add(panorama2);

panorama.add(hotspot1P1);
panorama.add(hotspot2P1);


panorama2.add(hotspot1P2);
//panorama2.add(hotspot2P2);

panorama.link(panorama2, new THREE.Vector3( -129.01, 20, -5521.88 ));
panorama2.link(panorama, new THREE.Vector3( 8540, 20, 1421.88 ));

