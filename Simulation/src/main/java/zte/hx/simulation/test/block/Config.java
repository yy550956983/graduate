package zte.hx.simulation.test.block;

/**
 * fixed time step config.
 * 
 * @author hx
 *
 */
public class Config {
	static final Config DEFAULT_CONFIG = new Config();

	double T = 0.01;

	double t = 0.0;
	double tt = 10;

	int n = (int) (tt / T);
	int i = 0;

	double[] time = new double[n];

	void iterate(Once once) {
		while (i < n) {
			once.step(i, t);
			time[i] = t;
			++i;
			t += T;
		}
	}
}
