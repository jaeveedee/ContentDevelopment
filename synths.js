//FM SYNTH----------------------------------
var fmSynth = function() {
	//carrier
	this.carrier = audio.createOscillator();
	this.carrier.type = "sine";
	this.carrier.start(0);

	//modulator
	this.modulator = audio.createOscillator();
	this.modulator.type = "sine";
	this.modulator.start(0);
	
	//lfo
	this.lfo = audio.createOscillator();
	this.lfo.type = "sine";
	this.lfo.start(0);
	
	//lfo ammount
	this.lfoAmp = audio.createGain();
	this.lfoAmp.gain.maxValue = 1000;

	//mod ammount
	this.mod = audio.createGain();
	this.mod.gain.maxValue = 1000;
	this.modEnv = audio.createGain();

	//amp
	this.amp = audio.createGain();
	this.ampEnv = audio.createGain();
	this.ampEnv.gain.value = 0;

	//patching
	// [modulator]-gain->[mod]-gain->[modEnv]-frequency->[carrier]-gain->[amp]-gain->[ampEnv]->[destination]
	//                 [lfo]-gain->[lfoAmp]-frequency-|
	this.modulator.connect(this.mod);
	this.mod.connect(this.modEnv);
	this.modEnv.connect(this.carrier.frequency);
	this.lfo.connect(this.lfoAmp);
	this.lfoAmp.connect(this.carrier.frequency);
	this.carrier.connect(this.amp);
	this.amp.connect(this.ampEnv);
	this.ampEnv.connect(delScale);
	this.ampEnv.connect(vol);
};

fmSynth.prototype.attack = function(t) {
	this.ampEnv.gain.setTargetAtTime(1, audio.currentTime, t);
	this.modEnv.gain.setTargetAtTime(1, audio.currentTime, t);
};

fmSynth.prototype.release = function(t) {
	this.ampEnv.gain.setTargetAtTime(0, audio.currentTime, t);
	this.modEnv.gain.setTargetAtTime(0, audio.currentTime, t);
};