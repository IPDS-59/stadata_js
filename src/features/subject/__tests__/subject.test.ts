import { Subject } from '../domain/entities/Subject';

describe('Subject Entity', () => {
  it('should create a subject with all fields', () => {
    const subject = new Subject(1, 'Economy', 10, 'Economy Category');

    expect(subject.id).toBe(1);
    expect(subject.name).toBe('Economy');
    expect(subject.categoryId).toBe(10);
    expect(subject.category).toBe('Economy Category');
  });

  it('should convert to JSON correctly', () => {
    const subject = new Subject(1, 'Economy', 10, 'Economy Category');

    const json = subject.toJson();

    expect(json.subj_id).toBe(1);
    expect(json.title).toBe('Economy');
    expect(json.subcatid).toBe(10);
    expect(json.category).toBe('Economy Category');
  });

  it('should create from JSON correctly', () => {
    const json = {
      sub_id: 1,
      title: 'Economy',
      subcat_id: 10,
      category: 'Economy Category',
    };

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(1);
    expect(subject.name).toBe('Economy');
    expect(subject.categoryId).toBe(10);
    expect(subject.category).toBe('Economy Category');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Economy',
      categoryId: 10,
      subcat: 'Economy Category',
    };

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(1);
    expect(subject.name).toBe('Economy');
    expect(subject.categoryId).toBe(10);
    expect(subject.category).toBe('Economy Category');
  });

  it('should handle missing fields by defaulting to 0 for numbers and empty string for text', () => {
    const json = {};

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(0);
    expect(subject.name).toBe('');
    expect(subject.categoryId).toBe(0);
    expect(subject.category).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      sub_id: 1,
      title: 'Economy',
    };

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(1);
    expect(subject.name).toBe('Economy');
    expect(subject.categoryId).toBe(0);
    expect(subject.category).toBe('');
  });

  it('should handle string IDs by converting to number', () => {
    const json = {
      sub_id: '1',
      title: 'Economy',
      subcat_id: '10',
      category: 'Economy Category',
    };

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(1);
    expect(subject.name).toBe('Economy');
    expect(subject.categoryId).toBe(10);
    expect(subject.category).toBe('Economy Category');
  });

  it('should handle zero values correctly', () => {
    const json = {
      sub_id: 0,
      title: '',
      subcat_id: 0,
      category: '',
    };

    const subject = Subject.fromJson(json);

    expect(subject.id).toBe(0);
    expect(subject.name).toBe('');
    expect(subject.categoryId).toBe(0);
    expect(subject.category).toBe('');
  });
});
