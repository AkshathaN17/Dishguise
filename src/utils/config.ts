export class AppConfig {
  private static instance: AppConfig;
  private _appName: string = "Recipe Finder";
  private _reportCount: Map<string, { count: number; timestamps: Date[] }> = new Map();

  private constructor() {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get appName(): string {
    return this._appName;
  }

  set appName(value: string) {
    this._appName = value;
  }

  addReport(type: string): boolean {
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
    
    if (!this._reportCount.has(type)) {
      this._reportCount.set(type, { count: 0, timestamps: [] });
    }

    const report = this._reportCount.get(type)!;
    report.timestamps = report.timestamps.filter(t => t > twoWeeksAgo);
    report.timestamps.push(now);
    report.count = report.timestamps.length;

    return report.count >= 3;
  }
}