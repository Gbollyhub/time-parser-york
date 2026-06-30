import parse from '../src/parse';

describe('parse', () => {
  const FIXED_NOW = new Date(
    '2025-01-08T09:00:00.000Z'
  ).getTime();

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(FIXED_NOW);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('basic modifiers', () => {
    it('should add 1 day to now', () => {
      const result = parse('now()+1d');
      expect(result.toISOString()).toBe(
        '2025-01-09T09:00:00.000Z'
      );
    });

    it('should add 8 days to now', () => {
      const result = parse('now()+8d');
      expect(result.toISOString()).toBe(
        '2025-01-16T09:00:00.000Z'
      );
    });
  });

  describe('chained modifiers', () => {
    it('should add 10 days and 12 hours', () => {
      const result = parse('now()+10d+12h');
      expect(result.toISOString()).toBe(
        '2025-01-18T21:00:00.000Z'
      );
    });

    it('should subtract 2 days and add 12 hours', () => {
      const result = parse('now()-2d+12h');
      expect(result.toISOString()).toBe(
        '2025-01-06T21:00:00.000Z'
      );
    });
  });

  describe('all time units', () => {
    it('should handle seconds', () => {
      const result = parse('now()+30s');
      expect(result.toISOString()).toBe(
        '2025-01-08T09:00:30.000Z'
      );
    });

    it('should handle minutes', () => {
      const result = parse('now()+45m');
      expect(result.toISOString()).toBe(
        '2025-01-08T09:45:00.000Z'
      );
    });

    it('should handle hours', () => {
      const result = parse('now()+6h');
      expect(result.toISOString()).toBe(
        '2025-01-08T15:00:00.000Z'
      );
    });

    it('should handle months', () => {
      const result = parse('now()+1mon');
      expect(result.toISOString()).toBe(
        '2025-02-07T09:00:00.000Z'
      );
    });

    it('should handle years', () => {
      const result = parse('now()+1y');
      expect(result.toISOString()).toBe(
        '2026-01-08T09:00:00.000Z'
      );
    });
  });

  describe('edge cases', () => {
    it('should return current time for now() alone', () => {
      const result = parse('now()');
      expect(result.toISOString()).toBe(
        '2025-01-08T09:00:00.000Z'
      );
    });

    it('should handle subtraction', () => {
      const result = parse('now()-1d');
      expect(result.toISOString()).toBe(
        '2025-01-07T09:00:00.000Z'
      );
    });

    it('should handle large numbers', () => {
      const result = parse('now()+365d');
      expect(result.toISOString()).toBe(
        '2026-01-08T09:00:00.000Z'
      );
    });
  });

  describe('error handling', () => {
    it('should throw for missing now()', () => {
      expect(() => parse('2d+3h')).toThrow(
        'Expression must start with "now()"'
      );
    });

    it('should throw for empty string', () => {
      expect(() => parse('')).toThrow();
    });

    it('should throw for unknown time unit', () => {
      expect(() => parse('now()+3x')).toThrow(
        'Unknown time unit'
      );
    });

    it('should throw for invalid modifier format', () => {
      expect(() => parse('now()+abc')).toThrow();
    });
  });
});