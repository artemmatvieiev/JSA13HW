import { users, getDay, getAdultUsers, getRandomUsers } from './tools';
import chai from 'chai';
const { expect } = chai;

const usersTest = [{age: 14}, {age: 28}, {age: 18}, {age: 45}, {age: 68}];

describe('getDay', () => {
    it( 'should return current day', 
      () => expect( getDay() ).to.equal( new Date().getDay() ) 
    );
});

describe('getAdultUsers', () => {
  it('should return array with length 0 when getAdultUsers called without arguments',
    () => {
      expect( getAdultUsers() ).to.be.an('array');
      expect( getAdultUsers() ).to.have.lengthOf(0);
    }
  );

  it('should return array with length 3 when called getAdultUsers(usersTest)',
    () => {
      expect( getAdultUsers(usersTest) ).to.be.an('array');
      expect( getAdultUsers(usersTest) ).to.have.lengthOf(3);
    }
  );
});

describe('getRandomUsers', () => {
  const originalMathRandom = Math.random;
    
  it('should return false when getRandomUsers called without arguments',
    () => expect( getRandomUsers() ).to.be.false
  );

  it('should return array with length 3 when Math.random > 0.5', 
    () => {
      Math.random = () =>  0.9;
      expect( getRandomUsers(usersTest) ).to.be.an('array');
      expect( getRandomUsers(usersTest) ).to.have.lengthOf(3);
    }
  );

  it('should return array with length 2 when Math.random <= 0.5', 
    () => {
      Math.random = () =>  0.1;
      expect( getRandomUsers(usersTest) ).to.be.an('array');
      expect( getRandomUsers(usersTest) ).to.have.lengthOf(2);
    }
  );

  Math.random = originalMathRandom;
});
