function generatorPostcard(e) {
    $(e).prop("disabled", false);
    const userName = $('#postcardModal #username').val()
    if (!userName || userName.length > 13) {
        $('#postcardModal .modal-body .sum-character .alert-name').removeClass('invisible')
        return
    }
    $(e).attr("disabled", true);

    setTimeout(() => {
        $("#postcardModal .btn-create-postcard").attr('disabled', false)
    }, 3000);
    var canvas = document.getElementById('postcardCanvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = "anonymous";

    let positionY = [783, 783, 783, 783, 783, 783, 783, 783, 783, 783];
    
    let longName = [0, 3, 4, 6];
    let postcard = Math.floor(Math.random() * positionY.length);

    if (userName.length > 9)
        postcard = longName[Math.floor(Math.random() * longName.length)];

    const gender = $('#postcardModal .gender-input:checked').val()

    let prefix = ' cô/chú '

    if (gender == 0) prefix = prefix.replace("cô/chú", "cô");
    else if (gender == 1) prefix = prefix.replace("cô/chú", "chú");
    let suffixe = ' ạ!';

    var font = new FontFace('Ltim', 'url(./font/Ltim.otf)');

    document.fonts.add(font);

    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = '30px Ltim';

        ctx.textBaseline = "middle";

        var parts = [
            { text: prefix, color: "#007469" },
            { text: userName, color: "#e00000" },
            { text: suffixe, color: "#007469" }
        ];

        var totalWidth = 0;
        parts.forEach(function(part) {
            totalWidth += ctx.measureText(part.text).width;
        });

 
        var x = (canvas.width - totalWidth) / 2;
   
        var y = positionY[postcard];


        parts.forEach(function(part) {
            ctx.fillStyle = part.color; 
            ctx.fillText(part.text, (x - 25), y); 

            x += ctx.measureText(part.text).width;
        });
        $('#postcardModal').modal('hide')
        if (GVs.isIOS()) {
            $('#ios-image-modal .modal-body img').attr('src', canvas.toDataURL())
            $('#ios-image-modal').modal('show')
        } else {
            $('#resultModal #img-result').attr('src', canvas.toDataURL())
            $('#resultModal').modal('show')
        }
        postCreateCard(userName, 5)
    };

    font.load().then(function(loadedFont) {
        img.src = 'images/' + (postcard + 1) + '.jpeg';
    }).catch(function(error) {
        img.src = 'images/' + (postcard + 1) + '.jpeg';
        console.error('Font load error:', error);
    });

}

function downloadPostCard() {
    var canvas = document.getElementById('postcardCanvas');
    var dataURL = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = dataURL;
    a.download = 'Postcard.png'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function onInputNameChange(e) {
    if (e.target.value.length > 0) {
        $('#postcardModal .modal-body .sum-character .alert-name').addClass('invisible')
    }
    $('#postcardModal #count-name').html(e.target.value.length)
}

function postCreateCard(username, postcardName) {
    $.ajax({
        url: 'home/edit',
        method: 'POST',
        data: {
            username,
            postcardName
        }
    });
}

window.addEventListener('load', () => {
    $('#resultModal').on('hidden.bs.modal', event => {
        var canvas = document.getElementById('postcardCanvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $('#resultModal #img-result').attr('src', '')
    })
    $('#postcardModal').on('hidden.bs.modal', event => {
        $('#postcardModal #username').val('')
        $('#postcardModal #count-name').html('0')
        $('#postcardModal .modal-body .sum-character .alert-name').addClass('invisible')
        $('#postcardModal .gender-input').prop('checked', false)
    })
    $('#ios-image-modal').on('hidden.bs.modal', event => {
        $('#ios-image-modal .modal-body img').attr('src', '')
    })
})

function removeDisable() {
    $("#postcardModal .btn-create-postcard").prop('disabled', false)
}


$(document).ready(function() {
    $('.autoplay-slider').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,   
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                margin: 10
            }
            }
     ]
  });
  
  });