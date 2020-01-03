// Close nav after link is clicked
$('.navbar a.link').click(function(e) {
    e.preventDefault();

    // Execute VueJS code to change slider content
    $.when(changeSlider($(this).text())).then(initSlider());

    $('.navbar-collapse').collapse('hide');
})

// Vue JS Compiling
function changeSlider(data) {
    var beforeImageSrc;
    var afterImageSrc;

    if (data == 'Amli Parking Deck') {
        beforeImageSrc = './assets/img/before_after/AMLI Parking Deck before .jpg';
        afterImageSrc = './assets/img/before_after/AMLI Parking Deck after.jpg';
    }
    else if (data == 'Northside Medical 1') {
        beforeImageSrc = './assets/img/before_after/Northside Medical 1 before.jpg';
        afterImageSrc = './assets/img/before_after/Northside Medical 1 after.jpg'
    }
    else if (data == 'Northside Medical 2') {
        beforeImageSrc = './assets/img/before_after/Northside Medical 2 before.jpg';
        afterImageSrc = './assets/img/before_after/Northside Medical 2 after.jpg'
    }
    else if (data == 'Northside Medical 3') {
        beforeImageSrc = './assets/img/before_after/Northside Medical 3 before.jpg';
        afterImageSrc = './assets/img/before_after/Northside Medical 3 after.jpg'
    }
    /* Add New Slider Here */




    /* ===================== */
    else {
        beforeImageSrc = "";
        afterImageSrc = "";
    }

    var iS = new Vue({
        el: '#app',
        template: `
            <div id="app">
                <main>
                    <div class="ba-slider">
                        <img src="` + beforeImageSrc + `">
                        <div class="resize">
                            <img src="` + afterImageSrc + `">
                        </div>
                        <span class="handle"></span>
                    </div>
                </main>
            </div>`
    })
}

// Call & init
function initSlider() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });
}

$(document).ready(function() {
    $.when(changeSlider('Amli Parking Deck')).then(initSlider());
});

// Update sliders on resize.
$(window).resize(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
    });
});

function drags(dragElement, resizeElement, container) {
	
  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {
    
    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');
    
    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
    
    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();
 
    // Set limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerWidth - dragWidth - 10;
    
    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {
    	
        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        leftValue = moveX + posX - dragWidth;
        
        // Prevent going off limits
        if ( leftValue < minLeft) {
            leftValue = minLeft;
        } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
        }
        
        // Translate the handle's left value to masked divs width.
        widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
                
        // Set the new values for the slider and the handle. 
        // Bind mouseup events to stop dragging.
        $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function(){
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}