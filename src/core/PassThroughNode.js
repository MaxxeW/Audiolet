/*!
 * @depends AudioletNode.js
 */

/**
 * A specialized type of AudioletNode where values from the inputs are passed
 * straight to the corresponding outputs in the most efficient way possible.
 * PassThroughNodes are used in AudioletGroups to provide the inputs and
 * outputs, and can also be used in analysis nodes where no modifications to
 * the incoming audio are made.
 *
 * @constructor
 * @extends AudioletNode
 * @param {Audiolet} audiolet The audiolet object.
 * @param {Number} numberOfInputs The number of inputs.
 * @param {Number} numberOfOutputs The number of outputs.
 */
var PassThroughNode = function(audiolet, numberOfInputs, numberOfOutputs) {
    AudioletNode.call(this, audiolet, numberOfInputs, numberOfOutputs);
};
extend(PassThroughNode, AudioletNode);

/**
 * Create output buffers of the correct length, copying any input buffers to
 * the corresponding outputs.
 *
 * @param {Number} length The number of samples for the resulting buffers.
 */
PassThroughNode.prototype.createOutputSamples = function(length) {
    var numberOfOutputs = this.outputs.length;
    var numberOfInputs = this.inputs.length;
    // Copy the inputs buffers straight to the output buffers
    for (var i = 0; i < numberOfOutputs; i++) {
        var output = this.outputs[i];
        if (i < numberOfInputs) {
            // Copy the input buffer straight to the output buffers
            var input = this.inputs[i];
            output.samples = input.samples;
        }
        else {
            output.samples = new Array(output.getNumberOfChannels());
        }
    }
};

/**
 * toString
 *
 * @return {String} String representation.
 */
PassThroughNode.prototype.toString = function() {
    return 'Pass Through Node';
};
