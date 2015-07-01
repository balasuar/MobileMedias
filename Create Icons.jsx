﻿#target photoshop
// Photoshop Script to Create Icons
//
// Prerequisite:
// First, create at least a 1024x1024 px PNG file according to:
// http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
//
// Install - Save Create Icons.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop
//
// Update:
// * Just modify & save, no need to resart Photoshop once it's installed.
//
// Run:
// * With Photoshop open, select File > Scripts > Create Icons
// * When prompted select the prepared iTunesArtwork file for your app.
// * The different version of the icons will get saved to the same folder that
//   the iTunesArtwork file is in.
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html

// Turn debugger on. 0 is off.
// $.level = 1;

try
{
  // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
  var iTunesArtwork = File.openDialog("Select a sqaure PNG file that is at least 1024x1024.", "*.png", false);

  if (iTunesArtwork !== null) 
  { 
    var doc = open(iTunesArtwork, OpenDocumentType.PNG);
    
    if (doc == null)
    {
      throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
    }

    var startState = doc.activeHistoryState;       // save for undo
    var initialPrefs = app.preferences.rulerUnits; // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;     // use pixels

    if (doc.width != doc.height)
    {
        throw "Image is not square";
    }
    else if ((doc.width < 1024) && (doc.height < 1024))
    {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }
    else if (doc.width < 1024)
    {
        throw "Image width is too small!  Image width must be at least 1024 pixels.";
    }
    else if (doc.height < 1024)
    {
        throw "Image height is too small!  Image height must be at least 1024 pixels.";
    }
    
    // Folder selection dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");

    var outFolderIPad= new Folder(destFolder + "/Icons-iOS");
    if (!outFolderIPad.exists) 
    {
        outFolderIPad.create();
    }
    var outFolderIPad= new Folder(destFolder + "/Icons-Android");
    if (!outFolderIPad.exists) 
    {
        outFolderIPad.create();
    }

    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }

    // Save icons in PNG using Save for Web.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.PNG;
    sfw.PNG8 = false; // use PNG-24
    sfw.transparency = false;
    doc.info = null;  // delete metadata
    
    // iOS
    var icons = [
      {"name": "iTunesArtwok@2x", 		"size":1024},
      {"name": "iTunesArtwork",    		"size":512},
      
      {"name": "iPhone Spotlight iOS Settings iOS 5-8 29",           	    "size":29}, 
      {"name": "iPhone Spotlight iOS Settings iOS 5-8 29@2x",           	"size":58}, 
      {"name": "iPhone Spotlight iOS Settings iOS 5-8 29@3x",           	"size":87}, 
      
      {"name": "iPhone Spotlight iOS 7-8 40@2x",           	"size":80}, 
      {"name": "iPhone Spotlight iOS 7-8 40@3x",           	"size":120}, 
      

      
      {"name": "iPhone App iOS 5-6 57",           	"size":57}, 
      {"name": "iPhone App iOS 5-6 57@2x",           	"size":114}, 
      
      {"name": "iPhone App iOS 7-8 60@2x",            "size":120},
      {"name": "iPhone App iOS 7-8 60@3x",           	"size":180},
      
      {"name": "iPad 48",           	"size":48},       
      
      {"name": "iPad Settings iOS 5-8 29",           	"size":29}, 
      {"name": "iPad Settings iOS 5-8 29@2x",          "size":58}, 
      
      {"name": "iPad Spotlight iOS 7,8 40",           	"size":40}, 
      {"name": "iPad Spotlight iOS 7,8 40@2x",          "size":80},
      
      {"name": "iPad App iOS 5,6 50",         		"size":50},
      {"name": "iPad App iOS 5,6 50@2x",      		"size":100},
      
      {"name": "iPad App iOS 5,6 72",               "size":72},
      {"name": "iPad App iOS 5,6 72@2x",           	"size":144},
      
      {"name": "iPad App iOS 7,8 76",             	"size":76},
      {"name": "iPad App iOS 7,8 76@2x",            "size":152},
      
      {"name": "CarPlay iOS 8 120",           	"size":120}  
    ];

    var icon;
    for (i = 0; i < icons.length; i++) 
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);

      var destFileName = icon.name + ".png";

      doc.exportDocument(new File(destFolder + "/Icons-iOS/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }

    sfw.transparency = true;
    // Android
    var icons = [
        {"name": "Icon_16", 		    "size":16},
        {"name": "Icon_22", 		    "size":22},
        {"name": "Icon_24", 		    "size":24},
        {"name": "Icon_33", 		    "size":33},
        {"name": "Icon_36",             "size":36},
        {"name": "Icon_44",             "size":44},
        {"name": "Icon_48", 		    "size":48},
        {"name": "Icon_72",    		    "size":72},
        {"name": "Icon_96", 		    "size":96},
        {"name": "Icon_144",    		"size":144},
        {"name": "Icon_192", 		    "size":192},
        {"name": "Icon_512",    		"size":512}
    ];

    var icon;
    for (i = 0; i < icons.length; i++) 
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);

      var destFileName = icon.name + ".png";

      doc.exportDocument(new File(destFolder + "/Icons-Android/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }

    alert("Icons created!");
  }
}
catch (exception)
{
  // Show degbug message and then quit
	if ((exception != null) && (exception != ""))
    alert(exception);
 }
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
  
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}