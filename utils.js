

exports.compare = function(sage,bnkstmt){
	
	//console.log(bnkstmt.filter(b=>b['Ref Number'].toLocaleString().trim()=='FT234445'))
    let matches = [],conflicts=[],sageIndices=[],bnkIndices=[]
	console.log(`sage before ${sage.length}`)
	console.log(`bnkstmt before ${bnkstmt.length}`)
	/*sage.forEach(sage_rec => {
		let i=0
		bnkstmt.forEach(bnk_rec=>{
			let j=0
			if(sage_rec['Ref'].toLocaleString()==bnk_rec['Ref Number'].toLocaleString()){
				if((sage_rec['Debit']).toLocaleString()==(bnk_rec['Money In']).toLocaleString() && (sage_rec['Credit']).toLocaleString()==(bnk_rec['Money Out']).toLocaleString()){
					matches.push([sage_rec,bnk_rec])
				}else{
					conflicts.push([sage_rec,bnk_rec])
				}
				bnkstmt.splice(j,1)
				sage.splice(i,1)
			}
			j++
		})
		i++
	})*/

	sage.forEach(sage_rec => {
		console.log(sage_rec['Ref'].toLocaleString().trim())
		const refMatch = bnkstmt.filter(bnk_rec=> sage_rec['Ref'].toLocaleString().trim() == bnk_rec['Ref Number'].toLocaleString().trim())
		if(refMatch.length){
			if(sage_rec['Debit'].toLocaleString() == refMatch[0]['Money In'].toLocaleString() && sage_rec['Credit'].toLocaleString() == refMatch[0]['Money Out'].toLocaleString()) matches.push({s:sage_rec,b:refMatch[0]})
			else conflicts.push({s:sage_rec,b:refMatch[0]})
			//sage.splice(sage.findIndex(rec=>rec['Ref'].toLocaleString() == sage_rec['Ref'].toLocaleString()),1)
			//bnkstmt.splice(bnkstmt.findIndex(rec=>rec['Ref Number'].toLocaleString() == refMatch[0]['Ref Number'].toLocaleString()),1)

			sageIndices.push(sage.findIndex(rec=>rec['Ref'].toLocaleString().trim() == sage_rec['Ref'].toLocaleString().trim()))
			bnkIndices.push(bnkstmt.findIndex(rec=>rec['Ref Number'].toLocaleString().trim() == refMatch[0]['Ref Number'].toLocaleString().trim()))

		}
	})

	let sageCpy = [...sage]
	let bnkCpy = [...bnkstmt]

	console.log(sageIndices,bnkIndices)

	sageIndices.forEach(index=>{
		sageCpy.splice(index,1)
	})
	bnkIndices.forEach(index=>{
		bnkCpy.splice(index,1)
	})


	console.log(`matches ${matches.length}`)
	console.log(`conflicts ${conflicts.length}`)
	console.log(`sage after ${sage.length}`)
	console.log(`bnkstmt after ${bnkstmt.length}`)

    return {matches:matches,conflicts:conflicts,sageCpy,bnkCpy}

}
