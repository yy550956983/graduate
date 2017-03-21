package hust.hx.simulation.demo.block;

import java.util.ArrayList;
import java.util.List;

import hust.hx.simulation.demo.block.Config;
import hust.hx.simulation.demo.block.ControlBlock;
import hust.hx.simulation.demo.block.Inertia;
import hust.hx.simulation.demo.block.Integrator;
import hust.hx.simulation.demo.block.Adder;
import hust.hx.simulation.demo.block.Line;
import hust.hx.simulation.demo.block.Source;
import hust.hx.simulation.demo.block.StepSource;
import hust.hx.simulation.util.PrintUtil;
import hust.hx.util.TestUtil;

/**
 * <pre>
 * step->joint->inertia->integrator--->
 *         ^                        |
 *         |________________________|
 * </pre>
 * 
 * @author hx
 *
 */
public class ClosedTest {
	public static void main(String[] args) {
		Config config = Config.DEFAULT_CONFIG;

		Source step = new StepSource();
		Adder joint = new Adder();
		ControlBlock inertia = new Inertia();
		ControlBlock integrator = new Integrator();

		Line line1 = new Line(step, joint);
		Line line2 = new Line(joint, inertia);
		Line line3 = new Line(inertia, integrator);
		Line line4 = new Line(integrator, joint);

		joint.addLine(line1, Adder.ADD);
		joint.addLine(line4, Adder.SUB);

		List<Double> out = new ArrayList<>();
		TestUtil.timeIt(() -> {
			config.iterate(() -> {
				line1.push();
				line2.push();
				line3.push();
				line4.push();
				out.add(integrator.getLastOutput());
			});
		});
		TestUtil.print(out.size());
		TestUtil.print(config.time.length);
		TestUtil.printRange(out, 60);

		PrintUtil.print(pw -> {
			for (int i = 0; i < out.size(); ++i) {
				pw.println(String.format("%f %f", config.time[i], out.get(i)));
			}
		});
	}
}
