
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'MerryCristmas',
            location: {
                // decomment the following and add coordinates:
                // lat: <your-latitude>,
                // lng: <your-longitude>,
                lat: 35.461546,
                lng: -98.361598
            },
        },
    ];
}

var models = [
    
        {
        url: './assets/snowman/model.gltf',
        scale: '12.5 12.5 12.5',
        info: 'snowman',
        rotation: '0 180 0',
        //position: '-21 9 -106'
    },
    {
        url: './assets/ChristmasTree/model.gltf',
        scale: '40.5 40.5 40.5',
        info: 'Christmas Tree',
        rotation: '0 180 0',
    },
    {
        url: './assets/PeppermintPenguin/model.gltf',
        scale: '10.2 10.2 10.2',
        rotation: '0 180 0',
        info: 'Penguin',
    },
    {
        url: './assets/SurprisedSanta/model.gltf',
        scale: '22.0 22.0 22.0',
        rotation: '0 180 0',
        info: 'Santa',
    },
    {
        url: './assets/ChristmasTree2/model.gltf', 
        scale: '10.08 10.08 10.08',
        rotation: '0 180 0',
        info: 'Another Tree',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
