const { capitalizeWords, filterActiveUsers, logAction } = require('../index');
describe('capitalizeWords', () => {
    test('capitalizes first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles mixed case input', () => {
        expect(capitalizeWords('hELLo WoRLD')).toBe('HELLo WoRLD'); 
    // current implementation only uppercases first char, doesn’t lowercase rest
    });

    test('works with punctuation', () => {
        expect(capitalizeWords('hello-world test_case')).toBe('Hello-World Test_Case');
    });
});

describe('filterActiveUsers', () => {
    test('returns only active users', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];
        expect(filterActiveUsers(users)).toEqual([{ name: 'Alice', isActive: true }]);
    });

    test('returns empty array when no active users', () => {
        const users = [{ name: 'Charlie', isActive: false }];
        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('handles empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('ignores users without isActive property', () => {
        const users = [{ name: 'Dana' }];
        expect(filterActiveUsers(users)).toEqual([]);
    });
});

describe('logAction', () => {
    test('returns string with username and action', () => {
        const result = logAction('login', 'George');
        expect(result).toMatch(/User George performed login at/);
    });

    test('includes ISO timestamp', () => {
        const result = logAction('logout', 'Alice');
        // ISO timestamps look like 2025-12-18T09:23:00.000Z
        expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('works with different actions and usernames', () => {
        const result = logAction('delete', 'Bob');
        expect(result).toContain('User Bob performed delete');
    });
});