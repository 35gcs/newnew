import { Exercise, MovementDysfunction, BodyRegion } from '@/types/assessment';

export const exercises: Exercise[] = [
  // ANKLE MOBILITY EXERCISES
  {
    id: 'wall-ankle-mobilization',
    name: 'Wall Ankle Mobilization',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['ankle'],
    targetsDysfunctions: ['ankle_dorsiflexion_deficit'],
    description: 'A self-mobilization technique to improve ankle dorsiflexion range of motion.',
    instructions: [
      'Stand facing a wall with one foot about 4 inches from the wall',
      'Keep your heel firmly on the ground',
      'Drive your knee forward toward the wall, going over your toes',
      'Hold for 2 seconds when you feel a stretch in the front of your ankle',
      'Return to start and repeat'
    ],
    sets: '2-3',
    reps: '15-20 per side',
    frequency: 'Daily',
    contraindications: ['Acute ankle sprain', 'Recent ankle surgery'],
    progressions: ['Add a resistance band around ankle for more mobilization', 'Increase distance from wall'],
    regressions: ['Start closer to wall', 'Use hand support for balance']
  },
  {
    id: 'calf-foam-roll',
    name: 'Calf Foam Rolling',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['ankle'],
    targetsDysfunctions: ['ankle_dorsiflexion_deficit'],
    description: 'Self-myofascial release technique for the calf muscles to improve ankle mobility.',
    instructions: [
      'Sit on the floor with one leg extended and calf on a foam roller',
      'Cross the other leg over for added pressure (optional)',
      'Roll slowly from just below the knee to just above the ankle',
      'Pause on tender spots for 20-30 seconds',
      'Rotate leg in and out to hit different areas of the calf'
    ],
    sets: '1',
    reps: '60-90 seconds per leg',
    frequency: 'Daily or before workouts',
    contraindications: ['Blood clots', 'Acute injury'],
    progressions: ['Use a firmer roller', 'Add leg over for more pressure'],
    regressions: ['Use a softer roller', 'Reduce pressure by keeping both legs down']
  },
  {
    id: 'banded-ankle-distraction',
    name: 'Banded Ankle Distraction',
    category: 'mobility',
    difficulty: 'intermediate',
    targetRegions: ['ankle'],
    targetsDysfunctions: ['ankle_dorsiflexion_deficit'],
    description: 'Joint mobilization using a resistance band to improve ankle dorsiflexion.',
    instructions: [
      'Anchor a resistance band low to the ground',
      'Loop the band around your ankle, just below the ankle bones',
      'Step forward so there\'s tension pulling your ankle back',
      'Lunge forward, driving your knee over your toes',
      'Hold the end position for 2-3 seconds'
    ],
    sets: '2-3',
    reps: '15-20 per side',
    frequency: 'Daily or before lower body workouts',
    contraindications: ['Acute ankle sprain', 'Severe ankle instability'],
    progressions: ['Use a heavier band', 'Add ankle circles at end range'],
    regressions: ['Use a lighter band', 'Reduce range of motion']
  },

  // HIP MOBILITY EXERCISES
  {
    id: '90-90-hip-stretch',
    name: '90/90 Hip Stretch',
    category: 'mobility',
    difficulty: 'intermediate',
    targetRegions: ['hip'],
    targetsDysfunctions: ['hip_internal_rotation_deficit', 'hip_external_rotation_deficit'],
    description: 'A comprehensive hip stretch that addresses both internal and external rotation.',
    instructions: [
      'Sit on floor with front leg bent 90° in front, back leg bent 90° to the side',
      'Try to keep both sit bones on the ground',
      'Sit tall with neutral spine',
      'Lean forward over front leg for a deeper stretch',
      'Hold and breathe, then switch sides'
    ],
    sets: '2-3',
    reps: '60-90 second holds per side',
    frequency: 'Daily',
    contraindications: ['Acute hip injury', 'Recent hip surgery'],
    progressions: ['Transition between sides without hands', 'Add forward fold'],
    regressions: ['Sit on a yoga block', 'Reduce knee bend angles']
  },
  {
    id: 'hip-flexor-stretch',
    name: 'Half-Kneeling Hip Flexor Stretch',
    category: 'stretching',
    difficulty: 'beginner',
    targetRegions: ['hip'],
    targetsDysfunctions: ['hip_extension_deficit'],
    description: 'Stretches the hip flexors which are often tight from prolonged sitting.',
    instructions: [
      'Kneel on one knee with the other foot flat in front',
      'Tuck your tailbone under (posterior pelvic tilt)',
      'Squeeze the glute of the kneeling leg',
      'Shift weight forward slightly while maintaining pelvic tilt',
      'You should feel a stretch in the front of the back leg\'s hip'
    ],
    sets: '2-3',
    reps: '30-60 second holds per side',
    frequency: 'Daily, especially after sitting',
    contraindications: ['Knee pain with kneeling'],
    progressions: ['Raise arm overhead on stretch side', 'Add side bend away from stretch'],
    regressions: ['Use padding under knee', 'Reduce forward shift']
  },
  {
    id: 'piriformis-stretch',
    name: 'Supine Piriformis Stretch',
    category: 'stretching',
    difficulty: 'beginner',
    targetRegions: ['hip'],
    targetsDysfunctions: ['hip_external_rotation_deficit'],
    description: 'Stretches the piriformis and deep hip rotators.',
    instructions: [
      'Lie on your back with both knees bent',
      'Cross one ankle over the opposite knee',
      'Reach through and grab the bottom thigh or shin',
      'Pull the bottom leg toward your chest',
      'Keep your head on the ground and relax your shoulders'
    ],
    sets: '2-3',
    reps: '30-60 second holds per side',
    frequency: 'Daily',
    contraindications: ['Acute hip injury', 'Severe sciatica'],
    progressions: ['Increase pull toward chest', 'Add gentle press on crossed knee'],
    regressions: ['Use a strap around thigh', 'Keep bottom foot on ground']
  },
  {
    id: 'hip-cars',
    name: 'Hip CARs (Controlled Articular Rotations)',
    category: 'mobility',
    difficulty: 'intermediate',
    targetRegions: ['hip'],
    targetsDysfunctions: ['hip_internal_rotation_deficit', 'hip_external_rotation_deficit', 'hip_flexion_deficit'],
    description: 'Active hip mobility exercise that takes the joint through its full range of motion.',
    instructions: [
      'Start on hands and knees in quadruped position',
      'Lift one knee off the ground',
      'Draw the biggest circle possible with your knee',
      'Move slowly and with control through the entire range',
      'Complete circles in both directions'
    ],
    sets: '2-3',
    reps: '5 circles each direction per side',
    frequency: 'Daily as part of warm-up',
    contraindications: ['Acute hip injury', 'Hip impingement with pain'],
    progressions: ['Increase circle size', 'Pause at challenging positions'],
    regressions: ['Smaller circles', 'Support knee with hand']
  },

  // CORE STABILITY EXERCISES
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'stability',
    difficulty: 'beginner',
    targetRegions: ['core', 'lumbar_spine'],
    targetsDysfunctions: ['core_stability_deficit'],
    description: 'Core stability exercise that teaches proper bracing while moving limbs.',
    instructions: [
      'Lie on your back with arms reaching toward ceiling and knees bent at 90°',
      'Press your lower back into the floor (no space under your back)',
      'Slowly lower one arm overhead while extending the opposite leg',
      'Return to start and repeat on the other side',
      'Maintain the lower back pressed into the floor throughout'
    ],
    sets: '3',
    reps: '8-12 per side',
    frequency: '3-4 times per week',
    contraindications: ['Acute low back pain'],
    progressions: ['Add resistance band', 'Lower arm and leg slower'],
    regressions: ['Move only arms', 'Move only legs', 'Reduce range of motion']
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    category: 'stability',
    difficulty: 'beginner',
    targetRegions: ['core', 'lumbar_spine'],
    targetsDysfunctions: ['core_stability_deficit'],
    description: 'Core and back stability exercise that promotes spinal control during movement.',
    instructions: [
      'Start on hands and knees with spine in neutral',
      'Brace your core as if preparing for a punch',
      'Extend one arm forward and the opposite leg back',
      'Keep hips level - don\'t let them rotate',
      'Hold briefly, then return with control and switch sides'
    ],
    sets: '3',
    reps: '8-12 per side',
    frequency: '3-4 times per week',
    contraindications: ['Acute low back pain', 'Wrist pain'],
    progressions: ['Add resistance band', 'Increase hold time', 'Add movement (drawing circles)'],
    regressions: ['Move only arms', 'Move only legs']
  },
  {
    id: 'pallof-press',
    name: 'Pallof Press',
    category: 'stability',
    difficulty: 'intermediate',
    targetRegions: ['core'],
    targetsDysfunctions: ['core_stability_deficit'],
    description: 'Anti-rotation exercise that builds core stability for rotational movements.',
    instructions: [
      'Stand sideways to a cable machine or anchored band',
      'Hold the handle at your chest with both hands',
      'Brace your core and stand tall',
      'Press the handle straight out in front of you',
      'Resist the rotation force, keeping hips and shoulders square',
      'Hold for 2-3 seconds, return to chest, repeat'
    ],
    sets: '3',
    reps: '10-12 per side',
    frequency: '2-3 times per week',
    contraindications: ['Acute back pain', 'Shoulder injury'],
    progressions: ['Increase resistance', 'Half-kneeling position', 'Add overhead reach'],
    regressions: ['Decrease resistance', 'Wider stance', 'Shorter holds']
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    category: 'stability',
    difficulty: 'beginner',
    targetRegions: ['core', 'shoulder'],
    targetsDysfunctions: ['core_stability_deficit'],
    description: 'Fundamental core stability exercise that builds endurance in the trunk muscles.',
    instructions: [
      'Start face down, then lift onto forearms and toes',
      'Elbows directly under shoulders',
      'Create a straight line from head to heels',
      'Squeeze glutes and brace core',
      'Don\'t let hips sag or pike up',
      'Hold while breathing normally'
    ],
    sets: '3',
    reps: '20-60 second holds',
    frequency: '3-4 times per week',
    contraindications: ['Shoulder pain', 'Acute low back pain'],
    progressions: ['Increase time', 'Add arm or leg lift', 'Progress to hand plank'],
    regressions: ['Knees on ground', 'Incline plank on bench']
  },

  // GLUTE ACTIVATION & HIP STABILITY
  {
    id: 'clamshell',
    name: 'Clamshell',
    category: 'activation',
    difficulty: 'beginner',
    targetRegions: ['hip'],
    targetsDysfunctions: ['single_leg_stability_deficit', 'hip_external_rotation_deficit'],
    description: 'Glute medius activation exercise to improve hip stability.',
    instructions: [
      'Lie on your side with hips and knees bent at 45°',
      'Keep feet together and spine neutral',
      'Lift the top knee while keeping feet touching',
      'Don\'t let your pelvis roll backward',
      'Squeeze at the top, then lower with control'
    ],
    sets: '2-3',
    reps: '15-20 per side',
    frequency: 'Daily or as activation before workouts',
    contraindications: ['Acute hip pain'],
    progressions: ['Add resistance band', 'Lift feet off ground simultaneously'],
    regressions: ['Reduce range of motion', 'Support head with hand']
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'activation',
    difficulty: 'beginner',
    targetRegions: ['hip', 'core'],
    targetsDysfunctions: ['hip_extension_deficit', 'core_stability_deficit'],
    description: 'Fundamental glute activation exercise that also works hip extension.',
    instructions: [
      'Lie on your back with knees bent and feet flat on floor',
      'Feet hip-width apart, heels about 6 inches from glutes',
      'Push through heels and lift hips toward ceiling',
      'Squeeze glutes at the top',
      'Lower with control, don\'t just drop'
    ],
    sets: '3',
    reps: '12-15',
    frequency: '3-4 times per week',
    contraindications: ['Acute low back pain'],
    progressions: ['Single leg bridge', 'Add weight on hips', 'Feet elevated'],
    regressions: ['Smaller range of motion', 'Hold at top instead of reps']
  },
  {
    id: 'single-leg-glute-bridge',
    name: 'Single Leg Glute Bridge',
    category: 'strengthening',
    difficulty: 'intermediate',
    targetRegions: ['hip', 'core'],
    targetsDysfunctions: ['single_leg_stability_deficit', 'hip_extension_deficit', 'core_stability_deficit'],
    description: 'Progression of glute bridge that challenges single-leg stability.',
    instructions: [
      'Lie on back with knees bent',
      'Extend one leg straight out or toward ceiling',
      'Push through the planted foot and lift hips',
      'Keep pelvis level - don\'t let it drop on the lifted side',
      'Squeeze glute at top, lower with control'
    ],
    sets: '3',
    reps: '8-12 per side',
    frequency: '2-3 times per week',
    contraindications: ['Acute low back pain', 'Hip pain'],
    progressions: ['Add hold at top', 'Elevated foot', 'Add resistance band'],
    regressions: ['Bent knee on lifted leg', 'Return to double leg bridge']
  },
  {
    id: 'lateral-band-walk',
    name: 'Lateral Band Walk',
    category: 'activation',
    difficulty: 'beginner',
    targetRegions: ['hip'],
    targetsDysfunctions: ['single_leg_stability_deficit'],
    description: 'Glute medius strengthening exercise using resistance band.',
    instructions: [
      'Place a resistance band around legs just above knees',
      'Stand in quarter squat position',
      'Keep feet parallel and core engaged',
      'Step sideways, leading with one leg',
      'Follow with the other leg, maintaining tension in band',
      'Keep toes pointing forward throughout'
    ],
    sets: '2-3',
    reps: '10-15 steps each direction',
    frequency: 'Daily or as warm-up',
    contraindications: ['Acute hip or knee pain'],
    progressions: ['Band around ankles', 'Deeper squat position', 'Heavier band'],
    regressions: ['Lighter band', 'Band above knees', 'Taller stance']
  },

  // THORACIC SPINE MOBILITY
  {
    id: 'thoracic-rotation-stretch',
    name: 'Quadruped Thoracic Rotation',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['thoracic_spine'],
    targetsDysfunctions: ['thoracic_rotation_deficit'],
    description: 'Thoracic spine rotation mobilization in quadruped position.',
    instructions: [
      'Start on hands and knees',
      'Place one hand behind your head',
      'Rotate your upper body, bringing elbow toward the ceiling',
      'Keep your hips still and square to the ground',
      'Follow your elbow with your eyes',
      'Return to start and repeat'
    ],
    sets: '2-3',
    reps: '10-12 per side',
    frequency: 'Daily',
    contraindications: ['Acute back pain', 'Recent spine surgery'],
    progressions: ['Increase range', 'Add breath hold at end range'],
    regressions: ['Reduce range of motion', 'Support with bolster under chest']
  },
  {
    id: 'thread-the-needle',
    name: 'Thread the Needle',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['thoracic_spine', 'shoulder'],
    targetsDysfunctions: ['thoracic_rotation_deficit', 'shoulder_internal_rotation_deficit'],
    description: 'Flowing thoracic mobility exercise combining rotation and arm movement.',
    instructions: [
      'Start on hands and knees',
      'Reach one arm under your body, rotating your upper back',
      'Let your shoulder come to the ground',
      'Then reverse, reaching that arm toward the ceiling',
      'Follow your hand with your eyes throughout',
      'Keep hips stable and pointing down'
    ],
    sets: '2-3',
    reps: '8-10 per side',
    frequency: 'Daily',
    contraindications: ['Shoulder impingement', 'Acute back pain'],
    progressions: ['Increase range of motion', 'Add hold at each end'],
    regressions: ['Reduce range', 'Move more slowly']
  },
  {
    id: 'foam-roll-thoracic-extension',
    name: 'Foam Roll Thoracic Extension',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['thoracic_spine'],
    targetsDysfunctions: ['thoracic_extension_deficit'],
    description: 'Thoracic extension mobilization using a foam roller.',
    instructions: [
      'Lie on your back with foam roller under upper back',
      'Support your head with your hands',
      'Keep your glutes on the ground',
      'Extend back over the roller, opening your chest',
      'Move the roller to different segments of upper back',
      'Avoid rolling on the lower back'
    ],
    sets: '1-2',
    reps: '10-15 extensions at each segment',
    frequency: 'Daily',
    contraindications: ['Osteoporosis', 'Recent spine surgery'],
    progressions: ['Reach arms overhead during extension', 'Longer holds'],
    regressions: ['Softer roller', 'Smaller range of motion']
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow',
    category: 'mobility',
    difficulty: 'beginner',
    targetRegions: ['thoracic_spine', 'lumbar_spine'],
    targetsDysfunctions: ['thoracic_extension_deficit'],
    description: 'Gentle spinal mobility exercise moving through flexion and extension.',
    instructions: [
      'Start on hands and knees, spine neutral',
      'Cow: Drop belly toward floor, lift chest and tailbone',
      'Cat: Round your back toward ceiling, tuck chin and tailbone',
      'Move slowly and smoothly between positions',
      'Breathe in during cow, out during cat',
      'Focus on moving each segment of the spine'
    ],
    sets: '2-3',
    reps: '10-15 cycles',
    frequency: 'Daily, great for morning routine',
    contraindications: ['Acute back pain'],
    progressions: ['Add thoracic rotation at top of each', 'Slower, more controlled movement'],
    regressions: ['Smaller range of motion', 'Perform seated']
  },

  // SHOULDER MOBILITY & STABILITY
  {
    id: 'shoulder-cars',
    name: 'Shoulder CARs',
    category: 'mobility',
    difficulty: 'intermediate',
    targetRegions: ['shoulder'],
    targetsDysfunctions: ['shoulder_flexion_deficit', 'shoulder_external_rotation_deficit', 'shoulder_internal_rotation_deficit'],
    description: 'Controlled articular rotations to maintain and improve shoulder range of motion.',
    instructions: [
      'Stand tall with arm at your side, fist clenched',
      'Keep the rest of your body completely still',
      'Raise arm forward, then overhead, keeping it as close to your ear as possible',
      'Continue behind you as far as you can',
      'Rotate and return along a different path',
      'Move slowly through the entire range'
    ],
    sets: '2-3',
    reps: '3-5 circles each direction per arm',
    frequency: 'Daily',
    contraindications: ['Acute shoulder injury', 'Frozen shoulder (during acute phase)'],
    progressions: ['Increase tension/effort', 'Add pauses at end ranges'],
    regressions: ['Smaller range', 'Move more quickly through sticking points']
  },
  {
    id: 'wall-slides',
    name: 'Wall Slides',
    category: 'activation',
    difficulty: 'beginner',
    targetRegions: ['shoulder', 'thoracic_spine'],
    targetsDysfunctions: ['shoulder_flexion_deficit', 'thoracic_extension_deficit'],
    description: 'Shoulder mobility and scapular control exercise against a wall.',
    instructions: [
      'Stand with back against wall, feet 6 inches from wall',
      'Press lower back, upper back, and head into wall',
      'Place arms on wall in "goalpost" position (elbows at 90°)',
      'Slide arms up the wall overhead, keeping contact',
      'Go as high as you can while maintaining all contact points',
      'Slide back down with control'
    ],
    sets: '2-3',
    reps: '10-15',
    frequency: 'Daily',
    contraindications: ['Shoulder impingement (if painful)'],
    progressions: ['Hold at top', 'Add light resistance band'],
    regressions: ['Feet further from wall', 'Don\'t go as high']
  },
  {
    id: 'sleeper-stretch',
    name: 'Sleeper Stretch',
    category: 'stretching',
    difficulty: 'intermediate',
    targetRegions: ['shoulder'],
    targetsDysfunctions: ['shoulder_internal_rotation_deficit'],
    description: 'Posterior shoulder stretch to improve internal rotation.',
    instructions: [
      'Lie on your side with bottom arm straight in front at shoulder height',
      'Bend elbow to 90 degrees',
      'Use top hand to gently push bottom forearm toward floor',
      'Keep shoulder blade flat - don\'t let it wing up',
      'Stop when you feel a stretch in the back of your shoulder',
      'Hold and breathe, don\'t force'
    ],
    sets: '2-3',
    reps: '30-60 second holds per side',
    frequency: 'Daily, especially for overhead athletes',
    contraindications: ['Shoulder instability', 'Labral tear'],
    progressions: ['Gentle oscillations at end range'],
    regressions: ['Less pressure', 'Smaller range']
  },
  {
    id: 'prone-y-raise',
    name: 'Prone Y Raise',
    category: 'activation',
    difficulty: 'beginner',
    targetRegions: ['shoulder', 'thoracic_spine'],
    targetsDysfunctions: ['shoulder_flexion_deficit', 'thoracic_extension_deficit'],
    description: 'Lower trap and serratus anterior activation exercise.',
    instructions: [
      'Lie face down on floor or incline bench',
      'Arms at sides with thumbs pointing up',
      'Raise arms in a Y shape (about 45° from straight ahead)',
      'Squeeze shoulder blades together and down',
      'Lift as high as possible while keeping neck relaxed',
      'Hold briefly at top, lower with control'
    ],
    sets: '2-3',
    reps: '10-15',
    frequency: '3-4 times per week',
    contraindications: ['Acute shoulder pain', 'Rotator cuff tear'],
    progressions: ['Add light weights', 'Slower tempo'],
    regressions: ['Reduce range', 'Perform against wall']
  },

  // HIP HINGE & SQUAT PATTERNS
  {
    id: 'dowel-hip-hinge',
    name: 'Dowel Hip Hinge Drill',
    category: 'motor_control',
    difficulty: 'beginner',
    targetRegions: ['hip', 'lumbar_spine'],
    targetsDysfunctions: ['hip_hinge_pattern_dysfunction'],
    description: 'Motor control exercise to learn proper hip hinge mechanics.',
    instructions: [
      'Hold a dowel or broomstick behind your back',
      'It should touch your head, upper back, and tailbone',
      'Push hips back while keeping all three contact points',
      'Soften knees slightly but don\'t squat',
      'Hinge until you feel hamstrings stretch or lose contact',
      'Drive hips forward to return to standing'
    ],
    sets: '2-3',
    reps: '10-15',
    frequency: 'Daily until pattern is automatic',
    contraindications: ['Acute low back pain'],
    progressions: ['Add load (kettlebell)', 'Single leg RDL'],
    regressions: ['Hinge to chair for depth reference', 'Smaller range']
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'strengthening',
    difficulty: 'intermediate',
    targetRegions: ['ankle', 'knee', 'hip', 'core'],
    targetsDysfunctions: ['squat_pattern_dysfunction', 'ankle_dorsiflexion_deficit', 'hip_flexion_deficit'],
    description: 'Squat variation that teaches proper squat mechanics with counterbalance.',
    instructions: [
      'Hold a weight at chest height with both hands',
      'Stand with feet shoulder-width apart, toes slightly out',
      'Initiate squat by breaking at hips and knees simultaneously',
      'Keep chest up and elbows between knees at bottom',
      'Descend until thighs are at least parallel',
      'Drive through whole foot to stand'
    ],
    sets: '3',
    reps: '10-12',
    frequency: '2-3 times per week',
    contraindications: ['Knee pain with loading'],
    progressions: ['Increase weight', 'Add pause at bottom', 'Progress to front squat'],
    regressions: ['Box squat', 'Reduce depth', 'Lighter weight or bodyweight']
  },
  {
    id: 'box-squat',
    name: 'Box Squat',
    category: 'motor_control',
    difficulty: 'beginner',
    targetRegions: ['hip', 'knee', 'ankle'],
    targetsDysfunctions: ['squat_pattern_dysfunction'],
    description: 'Squat variation using a box to teach proper depth and control.',
    instructions: [
      'Stand in front of a box or chair',
      'Feet shoulder-width apart, arms crossed at chest',
      'Push hips back and lower until you touch the box',
      'Lightly touch the box - don\'t fully sit',
      'Keep weight in mid-foot, chest up',
      'Drive through feet to stand'
    ],
    sets: '3',
    reps: '10-12',
    frequency: 'Daily until pattern is learned',
    contraindications: ['Knee pain'],
    progressions: ['Lower box height', 'Add weight', 'Remove box'],
    regressions: ['Higher box', 'Hold onto something for balance']
  },

  // SINGLE LEG STABILITY PROGRESSION
  {
    id: 'single-leg-stance',
    name: 'Single Leg Stance',
    category: 'stability',
    difficulty: 'beginner',
    targetRegions: ['ankle', 'hip', 'core'],
    targetsDysfunctions: ['single_leg_stability_deficit'],
    description: 'Basic single leg balance exercise to build stability.',
    instructions: [
      'Stand on one leg with hands on hips',
      'Lift opposite foot just off the ground',
      'Keep standing hip level - don\'t let it drop',
      'Focus eyes on a fixed point ahead',
      'Maintain tall posture',
      'Hold as long as possible up to 60 seconds'
    ],
    sets: '3',
    reps: '30-60 second holds per leg',
    frequency: 'Daily',
    contraindications: ['Acute ankle injury', 'Significant balance disorder'],
    progressions: ['Close eyes', 'Turn head side to side', 'Stand on unstable surface'],
    regressions: ['Hold onto something lightly', 'Shorter holds']
  },
  {
    id: 'single-leg-deadlift',
    name: 'Single Leg Romanian Deadlift',
    category: 'strengthening',
    difficulty: 'advanced',
    targetRegions: ['hip', 'core', 'ankle'],
    targetsDysfunctions: ['single_leg_stability_deficit', 'hip_hinge_pattern_dysfunction', 'hip_extension_deficit'],
    description: 'Advanced single leg hip hinge combining strength and stability.',
    instructions: [
      'Stand on one leg with a slight knee bend',
      'Hinge at the hip, sending the free leg behind you',
      'Keep hips level as you lower',
      'Reach toward the ground with opposite hand (or both)',
      'Go as low as you can with a flat back',
      'Drive through standing leg to return to start'
    ],
    sets: '3',
    reps: '8-10 per leg',
    frequency: '2-3 times per week',
    contraindications: ['Acute low back pain', 'Poor balance'],
    progressions: ['Add weight', 'Increase range', 'Deficit position'],
    regressions: ['Kickstand stance (toe touch)', 'Hold onto something', 'Reduce range']
  }
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id);
}

export function getExercisesByDysfunction(dysfunction: MovementDysfunction): Exercise[] {
  return exercises.filter(ex => ex.targetsDysfunctions.includes(dysfunction));
}

export function getExercisesByRegion(region: BodyRegion): Exercise[] {
  return exercises.filter(ex => ex.targetRegions.includes(region));
}

export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return exercises.filter(ex => ex.category === category);
}

export function getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
  return exercises.filter(ex => ex.difficulty === difficulty);
}
