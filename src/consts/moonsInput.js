export const moonsPositionsInput = '<x=-1, y=0, z=2>,<x=2, y=-10, z=-7>,<x=4, y=-8, z=8>,<x=3, y=5, z=-1>'

export const moonsPositionObjectString = moonsPositionsInput.replace(/</g, "{").replace(/>/g, "}").replace(/=/g, ":").replace(/x/g, '"x"').replace(/y/g, '"y"').replace(/z/g, '"z"');
export const moonsPositionsArrayOfStrings = moonsPositionObjectString.split(',');
// export const positionsObjectsArray = moonsPositionsArrayOfStrings.forEach(element=>{
//   element = JSON.parse(element);
// })

// <x=7, y=10, z=17>
// <x=-2, y=7, z=0>
// <x=12, y=5, z=12>
// <x=5, y=-8, z=6>
export const positionsObjectsArray = [
  { x:7,
    y:10,
    z:17,
  },
  { x:-2,
    y:7,
    z:0,
  },
  { x:12,
    y:5,
    z:12,
  },
  { x:5,
    y:-8,
    z:6,
  },
]
// <x=-8, y=-10, z=0>
// <x=5, y=5, z=10>
// <x=2, y=-7, z=3>
// <x=9, y=-8, z=-3>
// export const positionsObjectsArray = [
//   { x:-8,
//     y:-10,
//     z:0,
//   },
//   { x:5,
//     y:5,
//     z:10,
//   },
//   { x:2,
//     y:-7,
//     z:3,
//   },
//   { x:9,
//     y:-8,
//     z:-3,
//   },
// ]
// export const positionsObjectsArray = [
//   { x:-1,
//     y:0,
//     z:2,
//   },
//   { x:2,
//     y:-10,
//     z:-7,
//   },
//   { x:4,
//     y:-8,
//     z:8,
//   },
//   { x:3,
//     y:5,
//     z:-1,
//   },
// ]
