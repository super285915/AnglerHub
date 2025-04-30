import { FishingTechnique } from '../types';

export const fishingTechniques: FishingTechnique[] = [
  {
    id: '1',
    title: 'Fly Fishing',
    description: 'An elegant angling method that uses an artificial "fly" to catch fish. The fly is cast using a fly rod, reel, and specialized weighted line.',
    difficulty: 'intermediate',
    bestFor: ['Trout', 'Salmon', 'Bass', 'Panfish'],
    steps: [
      'Choose the right fly to match local insect hatches',
      'Cast using a whipping motion to propel the lightweight fly',
      'Allow the fly to drift naturally in the current',
      'Set the hook with a quick lift of the rod when a fish strikes',
      'Play the fish carefully, keeping tension on the line'
    ],
    tips: [
      'Practice casting in an open area before heading to water',
      'Watch for rising fish to identify feeding patterns',
      'Use smaller flies in clear water or when fish are wary',
      'Consider hiring a guide for your first outing'
    ],
    imageUrl: 'https://images.pexels.com/photos/6485191/pexels-photo-6485191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'Bottom Fishing',
    description: 'A technique where bait is placed on or near the bottom of the water body to target fish that feed there. Effective in both freshwater and saltwater.',
    difficulty: 'beginner',
    bestFor: ['Catfish', 'Carp', 'Flounder', 'Grouper'],
    steps: [
      'Rig with appropriate weight to reach and stay on bottom',
      'Use natural bait that bottom-dwelling fish prefer',
      'Cast to likely holding areas and let bait settle',
      'Watch rod tip for subtle bites',
      'Set hook firmly when bite is detected'
    ],
    tips: [
      'Use circle hooks to improve hookup ratio and reduce gut-hooking fish',
      'Try different bait types to see what works best',
      'Be patient - bottom fish often take time to find your bait',
      'Consider using a fish finder to locate productive areas'
    ],
    imageUrl: 'https://images.pexels.com/photos/5560947/pexels-photo-5560947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    title: 'Topwater Fishing',
    description: 'Exciting technique using lures that float on the water\'s surface, creating commotion to attract predatory fish. Known for spectacular, visible strikes.',
    difficulty: 'intermediate',
    bestFor: ['Bass', 'Pike', 'Muskie', 'Redfish'],
    steps: [
      'Choose a topwater lure appropriate for target species',
      'Cast to likely ambush points - near structure or vegetation',
      'Vary retrieval speed and action to trigger strikes',
      'Wait to feel weight before setting hook (don\'t set on the splash)',
      'Keep rod tip up during the fight'
    ],
    tips: [
      'Best during low light conditions (dawn/dusk) or overcast days',
      'More effective in warmer water temperatures',
      'Make accurate casts to avoid spooking fish',
      'Try "walking the dog" technique with side-to-side lure action'
    ],
    imageUrl: 'https://images.pexels.com/photos/2080283/pexels-photo-2080283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    title: 'Jigging',
    description: 'Versatile technique using weighted lures (jigs) that are "jigged" up and down to imitate injured baitfish or other prey. Effective in various depths and conditions.',
    difficulty: 'beginner',
    bestFor: ['Walleye', 'Crappie', 'Bass', 'Saltwater Species'],
    steps: [
      'Select jig weight appropriate for water depth and conditions',
      'Cast to target area and allow jig to sink',
      'Lift rod tip sharply then lower while reeling slack',
      'Vary jigging pattern and speed until you find what works',
      'Set hook when you feel resistance'
    ],
    tips: [
      'Add soft plastic or live bait trailers to enhance appeal',
      'Use lighter jigs in shallow water, heavier in deep water',
      'Pay attention to where strikes occur in the jigging cycle',
      'Try different colors based on water clarity and light conditions'
    ],
    imageUrl: 'https://images.pexels.com/photos/6485323/pexels-photo-6485323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    title: 'Drop Shotting',
    description: 'Finesse technique where the weight is at the bottom of the rig and the bait is suspended above it, allowing for precise presentation and natural movement.',
    difficulty: 'intermediate',
    bestFor: ['Bass', 'Walleye', 'Panfish', 'Trout'],
    steps: [
      'Tie a drop shot rig with the hook 12-18 inches above the weight',
      'Attach a soft plastic bait to the hook',
      'Cast to target area and let weight hit bottom',
      'Keep line semi-taut and subtly shake rod tip',
      'Set hook with a quick upward motion when you feel a bite'
    ],
    tips: [
      'Use light line (6-10 lb test) for better sensitivity',
      'Try different hook heights above the weight',
      'Keep movements subtle - often less is more',
      'Works best in clear water where fish can see the bait'
    ],
    imageUrl: 'https://images.pexels.com/photos/2131882/pexels-photo-2131882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '6',
    title: 'Trolling',
    description: 'Method of fishing where one or more baited lines are drawn through the water behind a moving boat, covering large areas to locate actively feeding fish.',
    difficulty: 'intermediate',
    bestFor: ['Salmon', 'Trout', 'Walleye', 'Tuna', 'Marlin'],
    steps: [
      'Set up rods in holders with appropriate lures/baits',
      'Move boat at species-appropriate speed (usually 1.5-3 mph)',
      'Let out line to desired depth/distance',
      'Watch for strikes and adjust speed/depth as needed',
      'When fish strikes, remove rod from holder and fight fish'
    ],
    tips: [
      'Use planer boards to spread lines out wider',
      'Vary lure colors and types until you find what works',
      'Use downriggers for precise depth control',
      'Make regular turns to change lure speed and action'
    ],
    imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '7',
    title: 'Nymphing',
    description: 'Fly fishing technique that mimics aquatic insect larvae (nymphs) drifting underwater, where the majority of trout feeding occurs.',
    difficulty: 'advanced',
    bestFor: ['Trout', 'Grayling', 'Whitefish'],
    steps: [
      'Rig with appropriate weight and strike indicator',
      'Cast upstream and allow nymph to drift naturally',
      'Keep line tight to detect subtle strikes',
      'Watch indicator for any pause, dip, or unusual movement',
      'Set hook with quick upward motion of rod tip'
    ],
    tips: [
      'Focus on deeper pools and runs where nymphs naturally collect',
      'Use tungsten beadhead nymphs to get down quickly',
      'Try tandem rigs with different nymph patterns',
      'Adjust depth until you find feeding zone'
    ],
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '8',
    title: 'Carolina Rigging',
    description: 'Bottom-fishing technique using a weight separated from the hook by a leader, allowing bait to float slightly above bottom while maintaining contact with structure.',
    difficulty: 'beginner',
    bestFor: ['Bass', 'Catfish', 'Redfish', 'Flounder'],
    steps: [
      'Rig with sliding sinker, bead, swivel, and leader',
      'Attach appropriate bait or soft plastic to hook',
      'Cast to target area and allow rig to reach bottom',
      'Slowly drag rig across bottom with occasional pauses',
      'Set hook firmly when you feel resistance'
    ],
    tips: [
      'Use longer leaders (2-4 feet) in clear water',
      'Try different soft plastic baits until you find what works',
      'Focus on bottom contour changes and structure',
      'Lighter weights work better in shallow water'
    ],
    imageUrl: 'https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '9',
    title: 'Sight Fishing',
    description: 'Visual technique where anglers spot fish before casting, allowing for precise presentation directly to the target fish.',
    difficulty: 'advanced',
    bestFor: ['Bonefish', 'Permit', 'Redfish', 'Carp'],
    steps: [
      'Position yourself with sun at your back for better visibility',
      'Scan water for fish movement, shadows, or tails',
      'Make accurate, gentle cast beyond target fish',
      'Retrieve lure/fly into fish\'s feeding zone',
      'Set hook when fish takes bait'
    ],
    tips: [
      'Wear polarized sunglasses to reduce glare',
      'Move slowly and minimize false casts',
      'Use longer, lighter leaders in clear water',
      'Practice accuracy casting before hitting the water'
    ],
    imageUrl: 'https://images.pexels.com/photos/2131925/pexels-photo-2131925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '10',
    title: 'Drift Fishing',
    description: 'Technique where bait or lures are allowed to drift naturally with the current, ideal for rivers and streams.',
    difficulty: 'beginner',
    bestFor: ['Trout', 'Steelhead', 'Salmon', 'Panfish'],
    steps: [
      'Rig with appropriate weight for current speed',
      'Cast upstream at 45-degree angle',
      'Allow bait to drift naturally with current',
      'Keep line relatively tight to detect strikes',
      'Set hook quickly when you feel a bite'
    ],
    tips: [
      'Use just enough weight to occasionally tick bottom',
      'Mend line to prevent unnatural drag',
      'Focus on seams between fast and slow water',
      'Try different depths until you find feeding zone'
    ],
    imageUrl: 'https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '11',
    title: 'Spearfishing',
    description: 'Ancient fishing method where fish are harvested using a spear or specialized speargun while free diving or scuba diving.',
    difficulty: 'advanced',
    bestFor: ['Grouper', 'Snapper', 'Flounder', 'Lionfish'],
    steps: [
      'Learn proper diving techniques and safety',
      'Identify target species and legal regulations',
      'Approach fish slowly from behind or below',
      'Aim slightly below where fish appears due to refraction',
      'Make quick, decisive shot to vital area'
    ],
    tips: [
      'Never dive alone - always use buddy system',
      'Start with easier, slower-moving species',
      'Practice breath-holding techniques on land',
      'Be aware of local regulations and size limits'
    ],
    imageUrl: 'https://images.pexels.com/photos/2404444/pexels-photo-2404444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '12',
    title: 'Ice Fishing',
    description: 'Winter fishing technique where anglers cut holes through ice and fish vertically with specialized equipment.',
    difficulty: 'intermediate',
    bestFor: ['Walleye', 'Perch', 'Pike', 'Trout'],
    steps: [
      'Drill hole in ice with auger in promising location',
      'Clear slush from hole and set up shelter if desired',
      'Lower bait or lure to appropriate depth',
      'Jig rod tip with subtle movements',
      'Set hook quickly when bite is detected'
    ],
    tips: [
      'Always check ice thickness for safety (4+ inches minimum)',
      'Use electronics to locate fish and structure',
      'Bring ice cleats, warm clothing, and safety equipment',
      'Try different depths throughout the day as fish move'
    ],
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];