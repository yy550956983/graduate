package hust.hx.simulation.demo.block

import hust.hx.algorithm.gsa.ClassicGSA
import hust.hx.algorithm.gsa.ClassicGSA.Range as GsaRange
import hust.hx.simulation.util.PrintUtil
import hust.hx.util.TestUtil

def fitness(List origin,List output){
	def res=0.0
	for(int i=0;i<output.size();++i){
		res+=(output[i]-origin[i])**2
	}
	return res
}

def rs=new RegularSystem(0.8, 3.36, 0.2, 0.05)
rs.simulate()
def origin=rs.output
PrintUtil.print{pw->
	rs.time.eachWithIndex{t,idx->
		pw.println("$t ${rs.output[idx]}")
	}
}

def btRange=GsaRange.of(0.001, 1)
def tdRange=GsaRange.of(0.001, 5)
def tyRange=GsaRange.of(0.001, 1)
def tiRange=GsaRange.of(0.001, 1)
ClassicGSA u=new ClassicGSA({cordinate->
	def bt=cordinate[0]
	def td=cordinate[1]
	def ty=cordinate[2]
	def ti=cordinate[3]
	def sys=new RegularSystem(bt,td,ty,ti)
	sys.simulate()
	def output=sys.output
	def f=fitness(origin,output)
	return f
},btRange,tdRange,tyRange,tiRange)
u.configure(1000,50)
TestUtil.timeIt{ u.rockAndRoll(); }

println u.bestOne()
println("fitness: " + u.bestFitness())

def rsys=new RegularSystem(*(u.bestOne()))
rsys.simulate()
def time=rsys.time
def output=rsys.output
PrintUtil.print{p->
	time.eachWithIndex{v,i->
		p.println("$v ${output[i]}")
	}
}
