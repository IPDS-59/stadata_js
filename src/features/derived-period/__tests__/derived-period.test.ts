import { DerivedPeriod } from '../domain/entities/DerivedPeriod';

describe('DerivedPeriod Entity', () => {
  it('should create a derived period with all fields', () => {
    const derivedPeriod = new DerivedPeriod(1, '2024', 1, 'Tahunan');

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.period).toBe('2024');
    expect(derivedPeriod.groupId).toBe(1);
    expect(derivedPeriod.groupName).toBe('Tahunan');
  });

  it('should convert to JSON correctly', () => {
    const derivedPeriod = new DerivedPeriod(1, '2024', 1, 'Tahunan');

    const json = derivedPeriod.toJson();

    expect(json.turth_id).toBe(1);
    expect(json.turth).toBe('2024');
    expect(json.group_turth_id).toBe(1);
    expect(json.name_group_turth).toBe('Tahunan');
  });

  it('should create from JSON correctly', () => {
    const json = {
      turth_id: 1,
      turth: '2024',
      group_turth_id: 1,
      name_group_turth: 'Tahunan',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.period).toBe('2024');
    expect(derivedPeriod.groupId).toBe(1);
    expect(derivedPeriod.groupName).toBe('Tahunan');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      period: '2024',
      groupId: 1,
      groupName: 'Tahunan',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.period).toBe('2024');
    expect(derivedPeriod.groupId).toBe(1);
    expect(derivedPeriod.groupName).toBe('Tahunan');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(0);
    expect(derivedPeriod.period).toBe('');
    expect(derivedPeriod.groupId).toBe(0);
    expect(derivedPeriod.groupName).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      turth_id: 1,
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.period).toBe('');
    expect(derivedPeriod.groupId).toBe(0);
    expect(derivedPeriod.groupName).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      turth_id: '1',
      turth: '2024',
      group_turth_id: '1',
      name_group_turth: 'Tahunan',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.period).toBe('2024');
    expect(derivedPeriod.groupId).toBe(1);
    expect(derivedPeriod.groupName).toBe('Tahunan');
  });

  it('should handle zero values correctly', () => {
    const json = {
      turth_id: 0,
      turth: '',
      group_turth_id: 0,
      name_group_turth: '',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(0);
    expect(derivedPeriod.period).toBe('');
    expect(derivedPeriod.groupId).toBe(0);
    expect(derivedPeriod.groupName).toBe('');
  });
});
