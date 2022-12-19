import { Content } from '@/app/entities/content';

describe('Content', () => {
  it('should be able to create a notification content', () => {
    const value = 'any_content';
    const content = new Content(value);

    expect(content.value).toBe(value);
  });

  it('should be able to create a notification content with max 240 length', () => {
    const value = 'a'.repeat(240);
    const content = new Content(value);

    expect(content.value).toBe(value);
  });

  it('should throw an error if content length is less than 5', () => {
    expect(() => new Content('any')).toThrow();
  });

  it('should throw an error if content length is more than 240', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
