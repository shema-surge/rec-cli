const fs = require('node:fs')
const xlsx = require('xlsx')
const {compare} = require('./utils.js')

try{
	if(!process.argv[2] || !process.argv[3]) throw new Error("Missing arguments")
	const sagefile = fs.readFileSync(process.argv[2])
	const bnkfile = fs.readFileSync(process.argv[3])
	const sagewb = xlsx.read(sagefile)
	const bnkwb = xlsx.read(bnkfile)
	const sagews = sagewb.Sheets[sagewb.SheetNames[0]]
	const bnkws = bnkwb.Sheets[bnkwb.SheetNames[0]]
	const bnkrange = xlsx.utils.decode_range(bnkws['!ref'])
	bnkrange.s.r = 23

	bnkws['!ref'] = xlsx.utils.encode_range(bnkrange)
	sageData = xlsx.utils.sheet_to_json(sagews,{defval:""})
	bnkData = xlsx.utils.sheet_to_json(bnkws)

	const {matches,conflicts,sageCpy,bnkCpy} = compare([...sageData],[...bnkData])
	console.log(matches)
	//console.log(conflicts)
	console.log(sageCpy)
}catch(err){
	console.log(err)
}
