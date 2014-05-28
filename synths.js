


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





var fmTone = function(cFreq, mFreq, mAmp, cAttack, mAttack, cRelease, mRelease, scale) {
	
	this.timeOut = 0;
	this.maxTimeOut = 4;
	this.dead = false;
	this.cFreq = cFreq;
	this.mFreq = mFreq;
	this.mAmp = mAmp;
	this.cAttack = cAttack;
	this.mAttack = mAttack;
	this.cRelease = cRelease;
	this.mRelease = mRelease;
	this.scale = scale;
	
	//carrier
	this.carrier = audio.createOscillator();
	this.carrier.type = "sine";
	this.carrier.frequency.value = this.cFreq;
	this.carrier.start(0);


	//modulator
	this.modulator = audio.createOscillator();
	this.modulator.type = "sine";
	this.modulator.frequency.value = this.mFreq;
	this.modulator.start(0);

	//mod ammount
	this.mod = audio.createGain();
	this.mod.gain.maxValue = 1000;
	this.mod.gain.value = this.mAmp;
	
	this.modEnv = audio.createGain();
	this.modEnv.gain.value = 0;
	
	//amp
	this.amp = audio.createGain();
	this.ampEnv = audio.createGain();
	this.amp.gain.value = this.scale;
	
	this.ampEnv.gain.value = 0;

	//patching
	this.modulator.connect(this.mod);
	this.mod.connect(this.modEnv);
	this.modEnv.connect(this.carrier.frequency);
	this.carrier.connect(this.amp);
	this.amp.connect(this.ampEnv);
	this.ampEnv.connect(delScale);
	this.ampEnv.connect(vol);
	
	//make sounds
	this.attack();
};

fmTone.prototype.attack = function(t) {
	this.ampEnv.gain.setTargetAtTime(1, audio.currentTime, this.cAttack);
	this.modEnv.gain.setTargetAtTime(1, audio.currentTime, this.mAttack);
};

fmTone.prototype.release = function(t) {
	this.ampEnv.gain.setTargetAtTime(0, audio.currentTime, this.cRelease);
	this.modEnv.gain.setTargetAtTime(0, audio.currentTime, this.mRelease);
};


fmTone.prototype.update = function() {
	if(this.ampEnv.gain.value < 1.0e-7) {
		this.timeOut++;
	}
	else {
		this.timeOut = 0;
	}
	
	if(this.timeOut >= this.maxTimeOut) {
		this.kill();
		

		
	}
};

fmTone.prototype.kill = function() {
	this.modulator.stop(0);
	this.carrier.stop(0);
	this.ampEnv.gain.cancelScheduledValues(0);
	this.modEnv.gain.cancelScheduledValues(0);
	this.amp.gain.cancelScheduledValues(0);
	this.mod.gain.cancelScheduledValues(0);
	
	this.modulator.disconnect(this.mod);
	this.mod.disconnect(this.modEnv);
	this.modEnv.disconnect(this.carrier.frequency);
	this.carrier.disconnect(this.amp);
	this.amp.disconnect(this.ampEnv);
	this.ampEnv.disconnect(delScale);
	this.ampEnv.disconnect(vol);
	this.dead = true;
	console.log("killed");
};