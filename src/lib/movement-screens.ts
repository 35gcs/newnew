import { MovementScreen } from '@/types/assessment';

export const movementScreens: MovementScreen[] = [
  {
    id: 'overhead-squat',
    name: 'Overhead Squat Assessment',
    category: 'movement_pattern',
    description: 'A full-body movement screen that assesses mobility and stability throughout the kinetic chain.',
    purpose: 'Identifies mobility restrictions in ankles, hips, thoracic spine, and shoulders. Also reveals core stability and motor control issues.',
    instructions: [
      'Stand with feet shoulder-width apart, toes pointing forward',
      'Raise arms overhead with elbows fully extended',
      'Perform a squat, descending as low as possible while maintaining arm position',
      'Keep heels on the ground throughout the movement',
      'Perform 3-5 repetitions and assess the lowest position'
    ],
    scoringCriteria: {
      score1: 'Unable to squat past parallel, significant compensations: heels rise, excessive forward lean, arms fall forward, knees cave inward',
      score2: 'Can squat to parallel with minor compensations: slight forward lean, minor arm drift, some heel rise correctable with elevation',
      score3: 'Full depth squat with arms overhead, neutral spine, heels down, knees tracking over toes'
    },
    compensationPatterns: [
      {
        id: 'heel-rise',
        name: 'Heel Rise',
        description: 'Heels lift off the ground during descent',
        indicatesIssueWith: ['ankle_dorsiflexion_deficit', 'calf_tightness']
      },
      {
        id: 'forward-lean',
        name: 'Excessive Forward Lean',
        description: 'Trunk leans excessively forward',
        indicatesIssueWith: ['hip_flexion_deficit', 'ankle_dorsiflexion_deficit', 'thoracic_extension_deficit']
      },
      {
        id: 'arms-fall-forward',
        name: 'Arms Fall Forward',
        description: 'Arms cannot stay overhead and drift forward',
        indicatesIssueWith: ['shoulder_flexion_deficit', 'thoracic_extension_deficit', 'lat_tightness']
      },
      {
        id: 'knee-valgus',
        name: 'Knee Valgus',
        description: 'Knees collapse inward during squat',
        indicatesIssueWith: ['hip_external_rotation_deficit', 'glute_weakness', 'core_stability_deficit']
      },
      {
        id: 'lumbar-flexion',
        name: 'Lumbar Flexion (Butt Wink)',
        description: 'Lower back rounds at bottom of squat',
        indicatesIssueWith: ['hip_flexion_deficit', 'hamstring_tightness', 'core_stability_deficit']
      }
    ],
    affectedBodyRegions: ['ankle', 'knee', 'hip', 'lumbar_spine', 'thoracic_spine', 'shoulder', 'core']
  },
  {
    id: 'single-leg-balance',
    name: 'Single Leg Balance Test',
    category: 'stability',
    description: 'Assesses single-leg stability and balance, fundamental for walking, running, and daily activities.',
    purpose: 'Identifies hip stability deficits, ankle instability, and proprioceptive issues that can lead to injury.',
    instructions: [
      'Stand on one leg with hands on hips',
      'Lift the opposite foot off the ground, bending knee to 90 degrees',
      'Hold this position for 30 seconds',
      'Keep eyes open and focused on a point ahead',
      'Test both sides and compare'
    ],
    scoringCriteria: {
      score1: 'Unable to hold for 10 seconds, significant hip drop, excessive trunk sway, foot touches down multiple times',
      score2: 'Holds 10-25 seconds with moderate sway, minor hip drop, some trunk compensation',
      score3: 'Holds 30+ seconds with minimal sway, level pelvis, stable trunk'
    },
    compensationPatterns: [
      {
        id: 'hip-drop',
        name: 'Trendelenburg Sign (Hip Drop)',
        description: 'Pelvis drops on the non-stance side',
        indicatesIssueWith: ['glute_medius_weakness', 'hip_stability_deficit']
      },
      {
        id: 'trunk-lean',
        name: 'Lateral Trunk Lean',
        description: 'Trunk leans toward stance leg',
        indicatesIssueWith: ['glute_medius_weakness', 'core_stability_deficit']
      },
      {
        id: 'ankle-wobble',
        name: 'Excessive Ankle Movement',
        description: 'Ankle constantly adjusting and wobbling',
        indicatesIssueWith: ['ankle_instability', 'proprioceptive_deficit']
      }
    ],
    affectedBodyRegions: ['ankle', 'knee', 'hip', 'core']
  },
  {
    id: 'hip-hinge',
    name: 'Hip Hinge Assessment',
    category: 'movement_pattern',
    description: 'Assesses the ability to hinge at the hips while maintaining a neutral spine.',
    purpose: 'Identifies hip mobility restrictions and motor control issues that can lead to low back pain.',
    instructions: [
      'Stand with feet hip-width apart',
      'Place a dowel or broomstick along your spine (touching head, upper back, and sacrum)',
      'Push hips back while keeping the dowel in contact with all three points',
      'Lower torso until hamstrings feel a stretch or you can\'t maintain spine position',
      'Return to standing by driving hips forward'
    ],
    scoringCriteria: {
      score1: 'Cannot hinge without losing spine position, immediate lumbar flexion, knees bend excessively, weight shifts to toes',
      score2: 'Can hinge to 45 degrees with minor compensations, some loss of neutral spine near end range',
      score3: 'Full hip hinge (torso near parallel) maintaining all three dowel contact points, knees soft but not excessive flexion'
    },
    compensationPatterns: [
      {
        id: 'lumbar-rounding',
        name: 'Lumbar Spine Rounding',
        description: 'Lower back rounds during the hinge',
        indicatesIssueWith: ['hamstring_tightness', 'hip_flexion_deficit', 'motor_control_deficit']
      },
      {
        id: 'knee-dominant',
        name: 'Knee Dominant Pattern',
        description: 'Excessive knee bend instead of hip hinge',
        indicatesIssueWith: ['hip_hinge_pattern_dysfunction', 'motor_control_deficit']
      },
      {
        id: 'weight-forward',
        name: 'Weight Shift Forward',
        description: 'Weight moves to toes instead of staying on heels',
        indicatesIssueWith: ['hip_hinge_pattern_dysfunction', 'motor_control_deficit']
      }
    ],
    affectedBodyRegions: ['hip', 'lumbar_spine', 'core']
  },
  {
    id: 'shoulder-mobility',
    name: 'Shoulder Mobility Screen',
    category: 'mobility',
    description: 'Assesses shoulder mobility combining flexion, extension, internal and external rotation.',
    purpose: 'Identifies shoulder mobility restrictions that can lead to pain and compensatory movement patterns.',
    instructions: [
      'Stand tall with feet together',
      'Make a fist with each hand, thumbs inside fingers',
      'Reach one arm overhead and down your back (shoulder flexion + internal rotation)',
      'Reach the other arm behind your back and up (shoulder extension + external rotation)',
      'Try to touch fists together behind your back',
      'Measure the distance between fists, test both sides'
    ],
    scoringCriteria: {
      score1: 'Fists more than 1.5 hand lengths apart, significant asymmetry between sides',
      score2: 'Fists within 1-1.5 hand lengths, moderate symmetry',
      score3: 'Fists touch or within one hand length, good symmetry between sides'
    },
    compensationPatterns: [
      {
        id: 'spine-extension',
        name: 'Excessive Spine Extension',
        description: 'Arching back to reach further',
        indicatesIssueWith: ['shoulder_flexion_deficit', 'lat_tightness']
      },
      {
        id: 'shoulder-hike',
        name: 'Shoulder Hiking',
        description: 'Elevating shoulder to achieve more range',
        indicatesIssueWith: ['shoulder_mobility_deficit', 'upper_trap_overactivity']
      }
    ],
    affectedBodyRegions: ['shoulder', 'thoracic_spine']
  },
  {
    id: 'thoracic-rotation',
    name: 'Thoracic Rotation Assessment',
    category: 'mobility',
    description: 'Assesses rotational mobility of the thoracic spine, essential for many daily and athletic movements.',
    purpose: 'Identifies thoracic spine restrictions that can cause compensatory stress on the lumbar spine, shoulders, and neck.',
    instructions: [
      'Get into quadruped position (hands and knees)',
      'Place one hand behind your head',
      'Rotate your upper body, leading with the elbow toward the ceiling',
      'Keep your hips still and square to the ground',
      'Rotate as far as possible without moving the pelvis',
      'Test both sides and compare'
    ],
    scoringCriteria: {
      score1: 'Less than 30 degrees rotation, significant hip compensation, unable to dissociate upper and lower body',
      score2: 'Rotation between 30-45 degrees with minor hip movement',
      score3: '50+ degrees rotation with stable hips, good symmetry between sides'
    },
    compensationPatterns: [
      {
        id: 'hip-rotation',
        name: 'Hip Rotation',
        description: 'Hips rotate along with thoracic spine',
        indicatesIssueWith: ['thoracic_rotation_deficit', 'motor_control_deficit']
      },
      {
        id: 'lumbar-rotation',
        name: 'Lumbar Rotation',
        description: 'Rotation occurring at lumbar spine instead of thoracic',
        indicatesIssueWith: ['thoracic_rotation_deficit']
      }
    ],
    affectedBodyRegions: ['thoracic_spine', 'lumbar_spine']
  },
  {
    id: 'ankle-dorsiflexion',
    name: 'Ankle Dorsiflexion Test',
    category: 'mobility',
    description: 'Measures ankle dorsiflexion range of motion, critical for squatting, walking, and running.',
    purpose: 'Identifies ankle mobility restrictions that can cause compensations up the kinetic chain.',
    instructions: [
      'Stand facing a wall with one foot about 4-5 inches from the wall',
      'Keep your heel on the ground',
      'Try to touch your knee to the wall without lifting your heel',
      'If successful, move foot back slightly and repeat',
      'Measure the maximum distance your foot can be from the wall while still touching knee to wall',
      'Test both sides'
    ],
    scoringCriteria: {
      score1: 'Less than 3 inches from wall, significant restriction, heel rises easily',
      score2: '3-4 inches from wall, moderate mobility',
      score3: '5+ inches from wall, good dorsiflexion range'
    },
    compensationPatterns: [
      {
        id: 'heel-rise-df',
        name: 'Heel Rise',
        description: 'Heel lifts off ground during test',
        indicatesIssueWith: ['ankle_dorsiflexion_deficit', 'calf_tightness']
      },
      {
        id: 'foot-pronation',
        name: 'Excessive Pronation',
        description: 'Foot rolls inward to achieve more range',
        indicatesIssueWith: ['ankle_dorsiflexion_deficit', 'subtalar_restriction']
      }
    ],
    affectedBodyRegions: ['ankle']
  },
  {
    id: 'hip-90-90',
    name: 'Hip 90/90 Assessment',
    category: 'mobility',
    description: 'Assesses hip internal and external rotation in a functional position.',
    purpose: 'Identifies hip rotational mobility restrictions that affect squatting, lunging, and rotational movements.',
    instructions: [
      'Sit on the floor with both knees bent at 90 degrees',
      'Position one leg in front (90° hip flexion, 90° knee flexion) and one leg to the side (90° hip abduction, 90° knee flexion)',
      'Front leg tests external rotation, back leg tests internal rotation',
      'Try to keep both sit bones on the floor',
      'Assess ability to sit tall with neutral spine',
      'Switch sides and compare'
    ],
    scoringCriteria: {
      score1: 'Cannot get into position, significant lean away from front leg, sit bone lifts more than 3 inches',
      score2: 'Can achieve position with moderate lean, some sit bone elevation',
      score3: 'Sits comfortably with both sit bones down, tall spine, can maintain position easily'
    },
    compensationPatterns: [
      {
        id: 'sit-bone-lift',
        name: 'Sit Bone Elevation',
        description: 'Inability to keep both sit bones grounded',
        indicatesIssueWith: ['hip_internal_rotation_deficit', 'hip_external_rotation_deficit']
      },
      {
        id: 'trunk-lean',
        name: 'Excessive Trunk Lean',
        description: 'Leaning away from restricted hip',
        indicatesIssueWith: ['hip_mobility_deficit']
      }
    ],
    affectedBodyRegions: ['hip']
  },
  {
    id: 'active-straight-leg-raise',
    name: 'Active Straight Leg Raise',
    category: 'mobility',
    description: 'Assesses hamstring flexibility and core stability during leg movement.',
    purpose: 'Identifies hamstring tightness and core stability issues that can affect hip hinge patterns and cause low back pain.',
    instructions: [
      'Lie on your back with legs straight and arms at sides',
      'Keep one leg flat on the ground',
      'Raise the other leg as high as possible while keeping the knee straight',
      'Keep the down leg pressed into the ground',
      'Note the angle achieved relative to the down leg',
      'Test both sides'
    ],
    scoringCriteria: {
      score1: 'Less than 60 degrees, down leg lifts or bends, significant hamstring tightness',
      score2: '60-75 degrees with minor compensation, down leg stays relatively stable',
      score3: '80+ degrees, down leg stays flat, good hamstring flexibility'
    },
    compensationPatterns: [
      {
        id: 'down-leg-lift',
        name: 'Down Leg Lifts',
        description: 'Non-moving leg lifts off ground',
        indicatesIssueWith: ['core_stability_deficit', 'hip_flexor_tightness']
      },
      {
        id: 'knee-bend',
        name: 'Knee Bending',
        description: 'Moving leg bends at knee',
        indicatesIssueWith: ['hamstring_tightness']
      }
    ],
    affectedBodyRegions: ['hip', 'lumbar_spine', 'core']
  }
];

export function getScreenById(id: string): MovementScreen | undefined {
  return movementScreens.find(screen => screen.id === id);
}

export function getScreensByCategory(category: MovementScreen['category']): MovementScreen[] {
  return movementScreens.filter(screen => screen.category === category);
}

export function getScreensByBodyRegion(region: string): MovementScreen[] {
  return movementScreens.filter(screen =>
    screen.affectedBodyRegions.includes(region as MovementScreen['affectedBodyRegions'][number])
  );
}
