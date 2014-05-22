/*
 * GET home page.
 */

exports.control = function(req, res){

  var fs = require('fs');
  var RaspiCam = require("raspicam");		
  var filename = "",
      extention = "_%04d.jpg",
  	  path = "/home/pi/mypics/",
  	  datetime = new Date(),
  	  datestamp = datetime.getFullYear().toString() + datetime.getMonth().toString() + datetime.getDate().toString() + datetime.getHours().toString() + datetime.getMinutes().toString() + datetime.getSeconds().toString();
      

  var poutput = req.body.file || "timelapse_",
   	  pmode = req.body.mode || "photo",
   	  pwidth = req.body.pwidth || 1080,
      pheight = req.body.pheight || 720,
      ptime = req.body.ptime || ((pmode == "photo") ? 1 : 7200000),
      ptimelapse = req.body.ptimelapse || ((pmode == "photo") ? 1 : 1000) ;

    filename = poutput + extention; 
    path = path + poutput+ "_" + datestamp +"/";
    poutput = path + filename;
    fs.mkdir(path);


  var cam = new RaspiCam({
    mode : pmode,
    output : poutput,

    //w, width : Integer or String - Set image width
    w : pwidth,
    //h, height : Integer or String - Set image height
    h : pheight,
    //q, quality : Integer or String - Set jpeg quality <0 to 100>
    //t, timeout : Integer or String - Time (in ms) before takes picture and shuts down (if not specified, set to 5s)
    t : ptime,
    //th, thumb : String - Set thumbnail parameters (x:y:quality)    
    //e, encoding : String - Encoding to use for output file (jpg, bmp, gif, png)
    //x, exif : String - EXIF tag to apply to captures (format as 'key=value')
    //tl, timelapse : Integer or String - Timelapse mode. Takes a picture every ms    
    tl : ptimelapse,
    //n, nopreview : Do not display a preview window
    n : true
    //sh, sharpness : Integer or String - Set image sharpness (-100 to 100)
    //co, contrast : Integer or String - Set image contrast (-100 to 100)
    //br, brightness : Integer or String - Set image brightness (0 to 100)
    //sa, saturation : Integer or String - Set image saturation (-100 to 100)
    //ISO, ISO : Integer or String - Set capture ISO
    //ev, ev : Integer or String - Set EV compensation
    //ex, exposure : String - Set exposure mode (off,auto,night,nightpreview,backlight,spotlight,sports,snow,beach,verylong,fixedfps,antishake,fireworks)
    //awb, awb : String - Set AWB mode (off,auto,sun,cloud,shade,tungsten,fluorescent,incandescent,flash,horizon)
    //ifx, imxfx : String - Set image effect (none,negative,solarise,sketch,denoise,emboss,oilpaint,hatch,gpen,pastel,watercolour,film,blur,saturation,colourswap,washedout,posterise,colourpoint,colourbalance,cartoon)
    //cfx, colfx : String - Set colour effect (U:V)
    //mm, metering : String - Set metering mode (average,spot,backlit,matrix)
    //rot, rotation : Integer or String - Set image rotation (0-359)

    //hf, hflip : Set horizontal flip
    //vf, vflip : Set vertical flip
    

  });

 

  cam.start();
    
  //listen for the "read" event triggered when each new photo/video is saved
	cam.on("read", function(err, filename){ 
	    
	});


};