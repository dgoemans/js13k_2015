// Code from Jack Rugile http://codepen.io/jackrugile/blog/arcade-audio-for-js13k-games
function AudioPlayer() {
    this.sounds = {};
}

AudioPlayer.prototype.add = function( key, count, settings ) {
    this.sounds[ key ] = [];
    settings.forEach( function( elem, index ) {
        this.sounds[ key ].push( {
            tick: 0,
            count: count,
            pool: []
        } );
        for( var i = 0; i < count; i++ ) {
            var audio = new Audio();
            audio.src = jsfxr( elem );
            this.sounds[ key ][ index ].pool.push( audio );
        }
    }, this );
};

AudioPlayer.prototype.play = function( key ) {
    var sound = this.sounds[ key ];
    var soundData = sound.length > 1 ? sound[ Math.floor( Math.random() * sound.length ) ] : sound[ 0 ];
    if( soundData.pool[ soundData.tick ].duration ){
        soundData.pool[ soundData.tick ].play();
    }
    soundData.tick < soundData.count - 1 ? soundData.tick++ : soundData.tick = 0;
};