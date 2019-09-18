// Only requiring this line doesn't trigger the issue
//let electron = require('electron');

// Requiring and using any module besides `remote` seems to be fine
//let { session } = require('electron');



// Requiring remote (when paired with using SharedWorker), causes renderer process to remain alive after electron exits
// I'm not sure what's special about remote other than its v8Utils and object proxying capabilities... 

// Commenting this out prevents the renderer process leak somehow (even if SharedWorker is used)
require('electron').remote;

// It doesn't seem to matter if we keep a reference to `remote` or not...
//let { remote } = require('electron');


// NOTE: In the real application, remote is used to access/create Menu, MenuItems, etc... it just doesn't require real usage to trigger the leak
