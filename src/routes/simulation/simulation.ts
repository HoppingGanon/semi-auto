export const DEBUG = false;

interface ActionLog {
	yearCount: number;
	actionNumber: number;
	livingTthing: 'semi' | 'predator' | 'prey';
	category: 'die' | 'breed';
}

interface DetailsReport {
	dyingCount: number;
	breedingCount: number;
}

type ActionReport = { [key: string]: DetailsReport };

type YearReport = {
	[actionNumber: number]: ActionReport;
};

export type Report = { [yearCount: number]: YearReport };

export class Ecosystem {
	private _simulationYears = 100000;
	private _actionPerMonth = 12;

	private _predators: Predator[] = [];
	private _semis: Semi[] = [];
	private _preys: Prey[] = [];

	private _yearCount = 0;

	private _shuffledPreys: LivingTthing[] = [];

	private _actionNumber = 0;

	private _preySurvivalRate = 0;
	private _preySpawningMin = 0;
	private _preySpawningMax = 0;
	private _preyAdoptCount = 2000;
	private _preyBreesingRate = 100;

	constructor(args: {
		simulationYears: number;
		actionPerMonth: number;
		initPredCount: number;
		predLife: number;
		predSurvivalRate: number;
		predBreedingSpan: number;
		predBreedingAge: number;
		predBreedingRate: number;
		predSpawningMin: number;
		predSpawningMax: number;
		predEatingRate: number;
		predEatingMin: number;
		predEatingMax: number;
		initSemiCount: number;
		initSemiMinLife: number;
		initSemiMaxLife: number;
		semiSurvivalRate: number;
		semiMutationRate: number;
		semiSpawningMin: number;
		semiSpawningMax: number;
		semiBreedingRate: number;
		initPreyCount: number;
		preySurvivalRate: number;
		preySpawningMin: number;
		preySpawningMax: number;
		preyBreedingRate: number;
		preyAdoptCount: number;
	}) {
		this._simulationYears = args.simulationYears;
		this._actionPerMonth = args.actionPerMonth;
		this._preyAdoptCount = args.preyAdoptCount;
		this._preySurvivalRate = args.preySurvivalRate;
		this._preySpawningMin = args.preySpawningMin;
		this._preySpawningMax = args.preySpawningMax;
		this._preyBreesingRate = args.preyBreedingRate;

		this._yearCount = 0;
		for (let i = 0; i < args.initPredCount; i++) {
			const pred = new Predator(
				Math.floor(Math.random() * (args.predLife + 1)),
				args.predLife,
				args.predSurvivalRate,
				args.predBreedingSpan,
				args.predBreedingAge,
				args.predBreedingRate,
				args.predSpawningMin,
				args.predSpawningMax,
				args.predEatingRate,
				args.predEatingMin,
				args.predEatingMax
			);
			this._predators.push(pred);
		}

		for (let i = 0; i < args.initSemiCount; i++) {
			const life =
				args.initSemiMinLife +
				Math.floor((args.initSemiMaxLife - args.initSemiMinLife + 1) * Math.random());

			const semi = new Semi(
				Math.floor(Math.random() * (life + 1)),
				life,
				args.semiSurvivalRate,
				1,
				life,
				args.semiBreedingRate,
				args.semiSpawningMin,
				args.semiSpawningMax,
				args.semiMutationRate
			);
			this._semis.push(semi);
		}

		for (let i = 0; i < args.initPreyCount; i++) {
			const prey = this.getNewPrey();
			this._preys.push(prey);
		}

		if (DEBUG) {
			console.log(
				`セミ: ${this._semis.length}\n捕食者: ${this._predators.length}\nその他の被食者: ${this._preys.length}\n`
			);
		}
	}

	getNewPrey() {
		return new Prey(
			0,
			1,
			this._preySurvivalRate,
			1,
			1,
			this._preyBreesingRate,
			this._preySpawningMin,
			this._preySpawningMax
		);
	}

	get breedablePredatorsCount() {
		return this._predators.filter((p) => !p.wasBreeded).length;
	}
	get breedableSemisCount() {
		return this._semis.filter((s) => !s.wasBreeded).length;
	}
	get breedablePreysCount() {
		return this._preys.filter((p) => !p.wasBreeded).length;
	}
	get actionPerMonth() {
		return this._actionPerMonth;
	}

	get predatorsCount() {
		return this._predators.length;
	}
	get semisCount() {
		return this._semis.length;
	}
	get preysCount() {
		return this._preys.length;
	}

	get livingPreyCount() {
		return this._preys.filter((p) => !p.isDied).length;
	}
	get preyAdoptCount() {
		return this._preyAdoptCount;
	}

	get yearCount() {
		return this._yearCount;
	}

	get shuffledPreys() {
		return this._shuffledPreys;
	}

	get actionNumber() {
		return this._actionNumber;
	}

	doYears(count: number) {
		for (let i = 0; i < count; i++) {
			const result = this.doYear();
			if (!result) {
				return false;
			}
		}
		return true;
	}

	doYear() {
		if (this._yearCount < this._simulationYears) {
			for (
				this._actionNumber = 0;
				this._actionNumber < this._actionPerMonth - 1;
				this._actionNumber++
			) {
				this.doAction();
				if (DEBUG) {
					console.log(
						`${this._yearCount}年${this._actionNumber}回:セミ: ${this._semis.length}\n捕食者: ${this._predators.length}\nその他の被食者: ${this._preys.length}\n`
					);
				}
			}
			this.doAction();
			if (DEBUG) {
				console.log(
					`${this._yearCount}年${this._actionNumber}回:セミ: ${this._semis.length}\n捕食者: ${this._predators.length}\nその他の被食者: ${this._preys.length}\n`
				);
			}
			this.doLastAction();
			if (DEBUG) {
				console.log(
					`${this._yearCount}年末:セミ: ${this._semis.length}\n捕食者: ${this._predators.length}\nその他の被食者: ${this._preys.length}\n`
				);
			}

			this._yearCount++;
			return true;
		} else {
			return false;
		}
	}

	doLastAction() {
		// 繁殖フラグをリセット
		this._predators.forEach((pred) => {
			pred.wasBreeded = false;
		});
		this._semis.forEach((semi) => {
			semi.wasBreeded = false;
		});
		this._preys.forEach((prey) => {
			prey.wasBreeded = false;
		});

		// 年末アクション
		const preds = ([] as Predator[]).concat(this._predators);
		const semis = ([] as Semi[]).concat(this._semis);
		const preys = ([] as Prey[]).concat(this._preys);

		preds.forEach((pred) => {
			pred.doLastAction(this, () => {});
		});

		semis.forEach((semi) => {
			semi.doLastAction(this, () => {});
		});

		preys.forEach((prey) => {
			prey.doLastAction(this, () => {});
		});

		// 死亡者の整理
		this.removeDied({
			predators: true,
			preys: true,
			semis: true
		});
	}

	doAction() {
		this.shuffle();
		this._semis.forEach((semi) => {
			semi.doAction(this);
		});
		this.removeDied({
			semis: true
		});

		this.shuffle();
		this._preys.forEach((prey) => {
			prey.doAction(this);
		});

		// 適応数に調整する
		const dist = (this.livingPreyCount - this.preyAdoptCount) * (1 + Math.random() * 0);
		if (dist < 0) {
			for (let i = 0; i < -dist; i++) {
				this.addPrey(this.getNewPrey());
			}
		} else if (dist > 0) {
			const preys = this._preys.filter((p) => !p.isDied);
			for (let i = 0; i < Math.min(dist, preys.length); i++) {
				preys[i].die(this);
			}
		}

		this.removeDied({
			preys: true
		});

		this.shuffle();
		this._predators.forEach((pred) => {
			pred.doAction(this);
		});

		// 死亡者の整理
		this.removeDied({
			predators: true,
			preys: true,
			semis: true
		});
	}

	removeDied(args: { predators?: boolean; semis?: boolean; preys?: boolean }) {
		if (args.predators) {
			this._predators = this._predators.filter((p) => !p.isDied);
		}
		if (args.semis) {
			this._semis = this._semis.filter((p) => !p.isDied);
		}
		if (args.preys) {
			this._preys = this._preys.filter((p) => !p.isDied);
		}
	}

	shuffle() {
		this._shuffledPreys = (this._semis.filter((s) => s.isBreedable(this)) as LivingTthing[]).concat(
			this._preys
		);
		this._shuffledPreys.forEach((p) => {
			p.sortNum = Math.random();
		});
		this._shuffledPreys.sort((a, b) => a.sortNum - b.sortNum);
	}

	addSemi(item: Semi) {
		this.writeLog({
			livingTthing: 'semi',
			category: 'breed'
		});
		this._semis.push(item);
	}

	addPrey(item: Prey) {
		this.writeLog({
			livingTthing: 'prey',
			category: 'breed'
		});
		this._preys.push(item);
	}

	addPredators(item: Predator) {
		this.writeLog({
			livingTthing: 'predator',
			category: 'breed'
		});
		this._predators.push(item);
	}

	marriageSemi(index: number) {
		const item = this._semis.filter((p) => !p.wasBreeded)[index];
		if (!item) return null;
		item.wasBreeded = true;
		return item;
	}

	marriagePrey(index: number) {
		const item = this._preys.filter((p) => !p.wasBreeded)[index];
		if (!item) return null;
		item.wasBreeded = true;
		return item;
	}

	marriagePredators(index: number) {
		const item = this._predators.filter((p) => !p.wasBreeded)[index];
		if (!item) return null;
		item.wasBreeded = true;
		return item;
	}

	getReport() {
		const report: Report = {};
		this.actionLogs.forEach((l) => {
			const yr = report[l.yearCount] || {};
			const ar = yr[l.actionNumber] || {};
			const dr: DetailsReport = ar[l.livingTthing] || { breedingCount: 0, dyingCount: 0 };

			if (l.category === 'breed') {
				dr.breedingCount++;
			} else {
				dr.dyingCount++;
			}

			ar[l.livingTthing] = dr;
			yr[l.actionNumber] = ar;
			report[l.yearCount] = yr;
		});

		return report;
	}

	actionLogs: ActionLog[] = [];
	writeLog(args: Partial<ActionLog>) {
		this.actionLogs.push({
			yearCount: this._yearCount,
			actionNumber: this._actionNumber,
			category: args.category || 'die',
			livingTthing: args.livingTthing || 'semi'
		});
	}
}

function challenge(rate: number) {
	return Math.random() * 100 < rate;
}

function challengeN(rate: number, n: number) {
	if (n === 0) {
		return -1;
	}
	const rate2 = (1 - Math.pow((100 - rate) / 100, n)) * 100;
	return challenge(rate2) ? Math.floor(Math.random() * n) : -1;
}

abstract class LivingTthing {
	/** 年齢 */
	protected _age: number;
	/** 寿命 */
	protected _life: number;
	/** 生存率 */
	protected _survivalRate: number;
	/** 繁殖間隔 */
	protected _breedingSpan: number;
	/** 繁殖可能年齢 */
	protected _breedingAge: number;
	/** 繁殖可能年齢 */
	protected _breedingRate: number;

	/** 最小産卵数 */
	protected _spawningMin: number;
	/** 最大産卵数 */
	protected _spawningMax: number;

	/** 死んだかどうか */
	public isDied = false;
	/** シャッフルに使用するソート番号 */
	public sortNum = 0;
	/** 産卵済みかどうか */
	public wasBreeded = false;

	public get age(): number {
		return this._age;
	}

	get life() {
		return this._life;
	}

	public get survivalRate(): number {
		return this._survivalRate;
	}

	public get breedingSpan(): number {
		return this._breedingSpan;
	}

	public get breedingAge(): number {
		return this._breedingAge;
	}

	public get breedingRate(): number {
		return this._breedingRate;
	}

	public get spawningMin(): number {
		return this._spawningMin;
	}

	public get spawningMax(): number {
		return this._spawningMax;
	}

	constructor(
		age: number,
		life: number,
		survivalRate: number,
		breedingSpan: number,
		breedingAge: number,
		breedingRate: number,
		spawningMin: number,
		spawningMax: number
	) {
		this._age = age;
		this._life = life;
		this._survivalRate = survivalRate;
		this._breedingSpan = breedingSpan;
		this._breedingAge = breedingAge;
		this._breedingRate = breedingRate;
		this._spawningMin = spawningMin;
		this._spawningMax = spawningMax;
	}

	/** アクション実行 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	doAction(ecosystem: Ecosystem) {
		if (challenge(100 - this._survivalRate)) {
			// 自然死
			this.die(ecosystem);
			return;
		}
	}

	// 繁殖可能な残り個体数
	abstract breedableCount(ecosystem: Ecosystem): number;

	abstract die(ecosystem: Ecosystem): void;

	/** 年末アクション実行 */
	doLastAction(ecosystem: Ecosystem, callBack: (ecosystem: Ecosystem) => void) {
		if (this.isBreedable(ecosystem)) {
			// パートナー番号
			const partner = challengeN(this._breedingRate, this.breedableCount(ecosystem));
			if (partner !== -1) {
				// 繁殖
				this.breed(ecosystem, partner);
			}
		}

		callBack(ecosystem);

		// 加齢
		this._age++;

		if (this._life <= this._age) {
			// 寿命により死亡
			this.die(ecosystem);
		}
	}

	isBreedable(ecosystem: Ecosystem) {
		return (
			!this.wasBreeded &&
			this._age + 1 >= this._breedingAge &&
			(this._age + 1 - this._breedingAge) % this._breedingSpan === 0 &&
			ecosystem.actionNumber === ecosystem.actionPerMonth - 1
		);
	}

	abstract breed(ecosystem: Ecosystem, partnerIndex: number): void;
}

export class Semi extends LivingTthing {
	private _mutationRate: number;
	get mutationRate(): number {
		return this._mutationRate;
	}

	constructor(
		age: number,
		life: number,
		survivalRate: number,
		breedingSpan: number,
		breedingAge: number,
		breedingRate: number,
		spawningMin: number,
		spawningMax: number,
		mutationRate: number
	) {
		super(
			age,
			life,
			survivalRate,
			breedingSpan,
			breedingAge,
			breedingRate,
			spawningMin,
			spawningMax
		);
		this._mutationRate = mutationRate;
	}

	breed(ecosystem: Ecosystem, index: number) {
		const partner = ecosystem.marriageSemi(index);
		if (!partner) return;
		this.wasBreeded = true;

		// 繁殖
		const childrenCount =
			this._spawningMin + Math.floor((1 + this._spawningMax - this._spawningMin) * Math.random());

		for (let i = 0; i < childrenCount; i++) {
			// 順当な遺伝
			let childLife = partner.life + this.life;
			if (childLife % 2 === 0) {
				childLife = childLife / 2;
			} else {
				childLife = Math.floor(childLife / 2) + (challenge(50) ? 1 : 0);
			}

			// 突然変異
			if (challenge(this._mutationRate)) {
				childLife = Math.min(1, childLife + (challenge(50) ? 1 : -1));
			}

			ecosystem.addSemi(
				new Semi(
					0,
					childLife,
					this._survivalRate,
					this._breedingSpan,
					childLife,
					this._breedingRate,
					this._spawningMin,
					this._spawningMax,
					this._mutationRate
				)
			);
		}
	}

	breedableCount(ecosystem: Ecosystem): number {
		return ecosystem.breedableSemisCount;
	}

	die(ecosystem: Ecosystem) {
		ecosystem.writeLog({
			livingTthing: 'semi',
			category: 'die'
		});
		this.isDied = true;
	}
}

export class Predator extends LivingTthing {
	private _eatingRate: number;
	private _eatingMin: number;
	private _eatingMax: number;

	get eatingRate(): number {
		return this._eatingRate;
	}
	get eatingMin(): number {
		return this._eatingMin;
	}
	get eatingMax(): number {
		return this._eatingMax;
	}

	constructor(
		age: number,
		life: number,
		survivalRate: number,
		breedingSpan: number,
		breedingAge: number,
		breedingRate: number,
		spawningMin: number,
		spawningMax: number,
		eatingRate: number,
		eatingMin: number,
		eatingMax: number
	) {
		super(
			age,
			life,
			survivalRate,
			breedingSpan,
			breedingAge,
			breedingRate,
			spawningMin,
			spawningMax
		);
		this._eatingRate = eatingRate;
		this._eatingMin = eatingMin;
		this._eatingMax = eatingMax;
	}

	doAction(ecosystem: Ecosystem): void {
		super.doAction(ecosystem);

		// 最大捕食数を決める
		const eatingMax = Math.floor(
			this._eatingMin + (this._eatingMax - this._eatingMin + 1) * Math.random()
		);
		let eatCount = 0;
		for (const p of ecosystem.shuffledPreys.filter((p) => !p.isDied)) {
			if (challenge(this._eatingRate)) {
				// 捕食成立
				p.die(ecosystem);
				eatCount++;
				if (eatCount >= eatingMax) {
					break;
				}
			}
		}

		if (eatCount < this._eatingMin) {
			// 最小捕食数に到達していなければ死亡
			this.die(ecosystem);
		}
	}

	breed(ecosystem: Ecosystem, index: number) {
		this.wasBreeded = true;
		ecosystem.marriageSemi(index);

		// 繁殖
		const childrenCount =
			this._spawningMin + Math.floor((1 + this._spawningMax - this._spawningMin) * Math.random());

		for (let i = 0; i < childrenCount; i++) {
			ecosystem.addPredators(
				new Predator(
					0,
					this._life,
					this._survivalRate,
					this._breedingSpan,
					this._breedingAge,
					this._breedingRate,
					this._spawningMin,
					this._spawningMax,
					this._eatingRate,
					this._eatingMin,
					this._eatingMax
				)
			);
		}
	}

	breedableCount(ecosystem: Ecosystem): number {
		return ecosystem.breedablePredatorsCount;
	}

	die(ecosystem: Ecosystem) {
		ecosystem.writeLog({
			livingTthing: 'predator',
			category: 'die'
		});
		this.isDied = true;
	}
}

export class Prey extends LivingTthing {
	constructor(
		age: number,
		life: number,
		survivalRate: number,
		breedingSpan: number,
		breedingAge: number,
		breedingRate: number,
		spawningMin: number,
		spawningMax: number
	) {
		super(
			age,
			life,
			survivalRate,
			breedingSpan,
			breedingAge,
			breedingRate,
			spawningMin,
			spawningMax
		);
	}

	breed(ecosystem: Ecosystem, index: number) {
		this.wasBreeded = true;
		ecosystem.marriagePrey(index);

		// 繁殖
		const childrenCount =
			this._spawningMin + Math.floor((1 + this._spawningMax - this._spawningMin) * Math.random());
		for (let i = 0; i < childrenCount; i++) {
			ecosystem.addPrey(
				new Prey(
					0,
					this._life,
					this._survivalRate,
					this._breedingSpan,
					this._breedingAge,
					this._breedingRate,
					this._spawningMin,
					this._spawningMax
				)
			);
		}
	}

	breedableCount(ecosystem: Ecosystem): number {
		return ecosystem.breedablePreysCount;
	}

	die(ecosystem: Ecosystem) {
		ecosystem.writeLog({
			livingTthing: 'prey',
			category: 'die'
		});
		this.isDied = true;
	}
}
