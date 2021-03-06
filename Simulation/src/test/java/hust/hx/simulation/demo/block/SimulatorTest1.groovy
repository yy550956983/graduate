package hust.hx.simulation.demo.block

import hust.hx.simulation.util.PrintUtil
import hust.hx.util.TestUtil

class SimulatorTest1 {
	static def main(args){
		println ExciterModel.exciter

		Simulator sim=new Simulator()
		sim.initSystem(ExciterModel.exciter)
		TestUtil.timeIt{ sim.simulate() }

		TestUtil.printRange(sim.components.b7.data,20)
		def time=sim.config.time
		def out=sim.components.b7.data

		println time.size()
		println out.size()

		PrintUtil.print{pw->
			time.eachWithIndex {v,k->
				pw.println("${time[k]} ${out[k]}")
			}
		}
	}
}
