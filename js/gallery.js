galleryPlugin = {};

//define variables
var $imagePanel = $('.imagePanel');
var $image = $('article div');
var $caption = $('#caption');
var $captionTitle = $('#captionTitle');
var $captionBody = $('#captionBody');
var $toggleCaption = $('.toggleCaption');
var $button = $('.button');
var $back = $('.backButton');
var $next = $('.nextButton');
var $close = $('.closeButton');
var $delay = $('.delay');
var $currentImage;

var $firstImageButtons = $('.closeButton,.nextButton,.bottomContainer');
var $lastImageButtons = $('.closeButton,.backButton,.bottomContainer');

var gridSquare = $image.width(); 

galleryPlugin.init = function() {
	$imagePanel.hide();

	galleryPlugin.clickImage();
	galleryPlugin.toggleCaption();
	galleryPlugin.closeImage();
	galleryPlugin.previousImage();
	galleryPlugin.nextImage();

};


//function to change the background image
galleryPlugin.changeBackgroundImage = function() {
	var backgroundImage = $currentImage.css('background-image');
	$imagePanel.css('background-image',backgroundImage);
};


//retrieve/load the caption data for the current image
galleryPlugin.retrieveCaptionData = function(){
	var imageCapTitle = $currentImage.data('title');
	var imageCapBody = $currentImage.data('caption');
	// $caption.text(imageCapTitle).hide();
	$captionTitle.text(imageCapTitle);
	$captionBody.text(imageCapBody);
};



//function to find position of the grid version of the image (when you close the fullsize version it needs to minimize back into the correct position in the grid)
galleryPlugin.assignImagePosition = function(findForThis) {

	var position = findForThis.position();
	var imageOffsetTop = findForThis.offset().top;
	var scrollTop = $(window).scrollTop();
	var imageWidth = findForThis.width();
	var imageHeight = findForThis.height();
	var imageTop = imageOffsetTop - scrollTop;

	$imagePanel.css({
		position: 'fixed',
		top: imageTop,
		left: position.left,
		width: imageWidth,
		height: imageHeight
	});
};

//ASSIGN IMAGE POSITION ON CLOSE, PART 1
galleryPlugin.assignImagePositionClose = function(findForThis) {
	var positionCloseTop = $(window).scrollTop() + 'px';
	var positionCloseLeft = 0 + 'px'; 

	$imagePanel.css({
		position: 'absolute',
		top: positionCloseTop,
		left: positionCloseLeft,
		width: '100%',
		height: '100%'

	});
	console.log(positionCloseTop + " " + positionCloseLeft);

};

//ASSIGN IMAGE POSITION ON CLOSE, PART 2
galleryPlugin.assignImagePositionT2 = function(findForThat) {
	var positionCloseTopT2 = findForThat.position().top;
	var positionCloseLeftT2 = findForThat.position().left;

	$imagePanel.css({
		top: positionCloseTopT2,
		left: positionCloseLeftT2,
		width: gridSquare,
		height: gridSquare
	});

	console.log(positionCloseTopT2 + " " + positionCloseLeftT2);
};


//a function that hide captions if it's visible when a button is clicked
galleryPlugin.hideCaption = function() {
	if($caption.css('display') === 'block') {
		$caption.slideToggle('easeInOut');
	};
};

//WHEN AN IMAGE IN THE GRID IS CLICKED
galleryPlugin.clickImage = function() {
	$image.on('click', function(){
		$currentImage = $(this);
		// $('figcaption').fadeTo(500,1);
		
		//set the background image to corresponding image clicked
		galleryPlugin.changeBackgroundImage();
		galleryPlugin.retrieveCaptionData();

		galleryPlugin.assignImagePosition($currentImage);

		//3. show imagePanel
		$imagePanel.fadeIn('slow').addClass('animated');

		//4. expand imagePanel to the full screen
		$(this).delay(10).queue(function(){
		        $imagePanel.addClass('full');
		        $(this).dequeue();
		      });

		//fade in buttons for image clicked
		if($currentImage.hasClass('image1')) {
			$firstImageButtons.addClass('delay');

		}
		else if($currentImage.is(':last-child')){
			$lastImageButtons.addClass('delay');

		}
		else {
			$button.addClass('delay');
		};
	}); //END OF $IMAGE CLICK	

};	


//----------------------------------------------------------------
//TOGGLE CAPTION
//----------------------------------------------------------------

//TOGGLE CAPTION INFO
galleryPlugin.toggleCaption = function(){
	
	$toggleCaption.on('click', function(){
		$caption.slideToggle('easeInOut');
	});
};

//----------------------------------------------------------------
//CLOSE FULLSIZE IMAGE
//----------------------------------------------------------------

galleryPlugin.closeImage = function(){
	$close.on('click', function(){
		//T1
		galleryPlugin.hideCaption();
		$imagePanel.removeClass('full');
		galleryPlugin.assignImagePositionClose($currentImage);
		
		//Refresh/debug
		$imagePanel.width();
		$imagePanel.removeClass('animated');
		
		//T2
		$imagePanel.width();
		$imagePanel.addClass('animated');
		galleryPlugin.assignImagePositionT2($currentImage);

		$imagePanel.delay(1000).queue(function(){
			$imagePanel.css('display','none');
			$(this).dequeue();
		});

		$button.removeClass('delay');

	});
};

//----------------------------------------------------------------
//BACK BUTTON
//----------------------------------------------------------------

//click on back button goes to the prev img
//back button doesn't show on img1
galleryPlugin.previousImage = function(){
	$back.on('click',function(){
		$currentImage = $currentImage.prev();
		galleryPlugin.hideCaption();
		galleryPlugin.changeBackgroundImage();
		$(this).delay(500).queue(function(){
			galleryPlugin.retrieveCaptionData();
			$(this).dequeue();
		});

		//Hide the back button if the current image is the first image
		if($currentImage.hasClass('image1')) {
			$back.hide().removeClass('delay');
			$firstImageButtons.fadeIn().addClass('delay');			
		}
		else if($currentImage.is(':last-child')){
			$next.hide().removeClass('delay');
			$lastImageButtons.fadeIn().addClass('delay');
		}
		else {
			$button.fadeIn().addClass('delay');
		};

	});
};


//----------------------------------------------------------------
//NEXT BUTTON
//----------------------------------------------------------------

//click on next button goes to the next img
//next button doesn't show on image:last-child
galleryPlugin.nextImage = function(){
	$next.on('click',function(){
		$currentImage = $currentImage.next();
			galleryPlugin.hideCaption();
			galleryPlugin.changeBackgroundImage();
		$(this).delay(500).queue(function(){
			galleryPlugin.retrieveCaptionData();
			$(this).dequeue();
		});

		//Hide the next button if the current image is the last image
		if($currentImage.hasClass('image1')) {
			$back.hide().removeClass('delay');
			$firstImageButtons.fadeIn().addClass('delay');
		}
		else if($currentImage.is(':last-child')){
			$next.hide().removeClass('delay');
			$lastImageButtons.fadeIn().addClass('delay');
		}
		else {
			$button.fadeIn().addClass('delay');
		};


	});
};

//----------------------------------------------------------------
//RUN THE GALLERY
//----------------------------------------------------------------
$(function(){
	galleryPlugin.init();
});
