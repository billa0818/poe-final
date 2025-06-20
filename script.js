// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰ Menu';
    document.querySelector('header').prepend(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('show');
    });

    // Form submission handling
    const enquiryForm = document.querySelector('form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(enquiryForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Thank you for your enquiry! We will contact you soon.';
            enquiryForm.parentNode.insertBefore(successMsg, enquiryForm.nextSibling);
            
            // Reset form
            enquiryForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    }

    // Initialize gallery if it exists
    if (document.querySelector('.gallery')) {
        initGallery();
    }

    // Initialize map if it exists
    if (document.getElementById('map')) {
        initMap();
    }
});

function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-btn">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <div class="caption"></div>
    `;
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('img').alt;
            lightbox.querySelector('.lightbox-img').src = imgSrc;
            lightbox.querySelector('.caption').textContent = caption;
            lightbox.style.display = 'flex';
        });
    });

    lightbox.querySelector('.close-btn').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

function initMap() {
    // Default location - Polokwane, Limpopo
    const defaultLocation = { lat: -23.9045, lng: 29.4689 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: defaultLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });

    new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: 'Billa Plumbing Services',
        icon: {
            url: 'images/plumber-marker.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    });
}