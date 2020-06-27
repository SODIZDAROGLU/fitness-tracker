const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Setup variable for virtuals
// More info here, see header "Virtuals in JSON header":
// https://mongoosejs.com/docs/tutorials/virtuals.html
const opts = {
    toJSON: {
        virtuals: true
    }
};

const workoutSchema = new Schema({
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [{
            type: {
                type: String,
                required: "An exercise type is required",
            },
            name: {
                type: String,
                trim: true,
                required: "Enter the exercise's name"
            },
            duration: {
                type: Number,
                required: "Enter a duration"
            },
            weight: {
                type: Number,
                // required: "Enter a weight"
            },
            reps: {
                type: Number,
                // required: "Enter the number of reps"
            },
            sets: {
                type: Number,
                // required: "Enter the number of sets"
            },
            distance: {
                type: Number,
            }
        }]
    },
    opts
);

// total has the duration of each exercise added to it each time
// It's initial value is set to zero.
// More info here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;