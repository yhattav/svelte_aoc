const chemistryInput = '156 ORE => 6 TLFQZ|1 SZFV => 5 TNXGD|1 BQLJ, 3 VNKPF => 8 BQXZ|43 FPRFS, 5 CQJT, 20 LDKTQ, 48 ZPBLH, 21 MFVG, 43 WLWZQ, 1 ZWZQ, 11 PQZJP, 56 CTJGD, 35 SGDVW => 1 FUEL|11 BQXZ, 1 PRCSN => 7 DVFD|7 VWXB, 2 PRCSN, 24 VJSR, 9 MDWCG, 4 MFVG => 4 ZWZQ|32 BQXZ, 5 XDSHP, 16 KTXJR, 7 VJSR, 3 MDWCG, 11 KZFZG, 3 NVBN => 5 ZPBLH|2 BQLJ, 2 RSKH, 3 VWXB => 2 GWXCF|6 PRCSN, 1 NCRZ => 8 VJSR|5 TMQLD => 9 VDQL|9 MZQZS, 1 FLRB => 5 BQLJ|4 KLHS => 5 PQZJP|1 WJTS, 1 NCRZ, 27 XDSHP => 8 MFVG|1 FNXMV, 30 FPKM => 8 RDMDL|1 TNXGD, 21 XBCLW, 5 CWNV => 3 RSKH|4 KQFPJ => 2 NCRZ|10 CWNV, 8 HSXW => 9 FNXMV|2 TNXGD, 4 CWNV, 13 VJSR => 8 KTXJR|3 NCRZ, 1 GWXCF, 8 NVBN, 6 MDWCG, 3 VWXB, 4 KTXJR, 4 DVFD, 3 QXCV => 9 FPRFS|5 MZQZS, 9 TBVRN => 7 SZFV|37 GWXCF, 15 RDMDL, 2 MDWCG => 7 CQJT|1 VDQL, 2 HSXW => 4 NVBN|18 QHMTL, 7 FLRB, 1 SZFV => 3 FPKM|6 VDQL => 1 FNCN|3 QPHT => 7 LDKTQ|1 TLFQZ => 8 FWFR|7 VDQL, 8 KZFZG => 3 HSXW|9 TBVRN => 7 MZQZS|1 FLRB, 44 VNKPF, 1 LVZF => 8 QXCV|1 WLWZQ, 3 TBVRN, 4 TLFQZ => 9 KQFPJ|1 BQLJ, 1 PRCSN, 8 DHTNG => 5 VWXB|1 XDSHP, 6 NVBN => 1 BDGC|8 PRCSN, 1 DHTNG => 2 WJTS|19 DHTNG, 22 WLWZQ => 9 LVZF|185 ORE => 7 WLWZQ|1 TMQLD, 1 MZQZS => 8 KZFZG|111 ORE => 4 TBVRN|31 VDQL, 14 MZQZS => 7 XBCLW|6 VDQL, 3 KVPK => 9 SGDVW|1 FNCN => 6 QMKT|1 FNCN, 3 TMQLD => 7 VNKPF|2 QPHT => 6 VQXCJ|2 LDKTQ, 3 VQXCJ => 5 FLRB|1 FNCN, 3 FPKM, 1 SZFV => 2 DHTNG|1 KZFZG => 9 QHMTL|141 ORE => 5 QPHT|16 TNXGD => 9 CWNV|1 KQFPJ, 29 FWFR => 2 KVPK|1 TNXGD, 7 KLHS => 2 XDSHP|7 WJTS => 6 MDWCG|3 BDGC, 3 XDSHP, 1 NCRZ => 4 CTJGD|3 QMKT => 6 PRCSN|24 FWFR => 2 TMQLD|8 VNKPF => 3 KLHS'
//const chemistryInput = '171 ORE => 8 CNZTR| 7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL| 114 ORE => 4 BHXH| 14 VRPVC => 6 BMBT| 6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL| 6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT| 15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW| 13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW| 5 BMBT => 4 WPTQ| 189 ORE => 9 KTJDG| 1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP| 12 VRPVC, 27 CNZTR => 2 XDBXC| 15 KTJDG, 12 BHXH => 5 XCVML| 3 BHXH, 2 VRPVC => 7 MZWV| 121 ORE => 7 VRPVC| 7 XCVML => 6 RJRHP| 5 BHXH, 4 VRPVC => 5 LTCX'

//const chemistryInput = '2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG|17 NVRVD, 3 JNWZP => 8 VPVL|53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL|22 VJHF, 37 MNCFX => 5 FWMGM|139 ORE => 4 NVRVD|144 ORE => 7 JNWZP|5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC|5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV|145 ORE => 6 MNCFX|1 NVRVD => 8 CXFTF|1 VJHF, 6 MNCFX => 4 RFSQX|176 ORE => 6 VJHF'
//const chemistryInput = '157 ORE => 5 NZVS|165 ORE => 6 DCFZ|44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL|12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ|179 ORE => 7 PSHF|177 ORE => 5 HKGWZ|7 DCFZ, 7 PSHF => 2 XJWVT|165 ORE => 2 GPVTF|3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT'
//const chemistryInput = '9 ORE => 2 A|8 ORE => 3 B|7 ORE => 5 C|3 A, 4 B => 1 AB|5 B, 7 C => 1 BC|4 C, 1 A => 1 CA|2 AB, 3 BC, 4 CA => 1 FUEL'
//const chemistryInput = '10 ORE => 10 A|1 ORE => 1 B|7 A, 1 B => 1 C|7 A, 1 C => 1 D|7 A, 1 D => 1 E|7 A, 1 E => 1 FUEL'
//const chemistryInput = '7 ORE => 1 FUEL'
export const chemistryArray = chemistryInput.replace(/,/g, "&").split('|').map(element=> element.split(' => '))
// export const chemistryDigest = 1
export const chemistryOutcomes = []
export const chemistryIngrediants = []
export const chemistryDigest = chemistryArray.map(element=>{
  chemistryOutcomes.push(element[1].split(' '));
  chemistryIngrediants.push(element[0].split('& ').map(element=> element.split(' ')))
})

// export const chemistryIngrediants  = chemistry

// export const chemistryDigest = chemistryArray.map(element=>{
//   element.map(elem=>{

//     if(elem.length>1){
//       elem.split('& ');
//     } else {
//       elem.split(' ');
//     }
//   })
// })

//.map(element=>{if(element.length>1){element.split(', ').map(element=>element.split(' '))}})
