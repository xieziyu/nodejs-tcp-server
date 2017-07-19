import { expect } from 'chai';
import { spy }    from 'sinon';
import { LOG, LOG_LEVEL } from '../src/utils/log';

describe('utils:LOG', () => {
  let consoleSpy;

  beforeEach(() => {
    // create a sinon spy
    consoleSpy = spy(console, 'log');
  });

  afterEach(() => {
    // restore the spy
    consoleSpy.restore();
  });

  describe('ERROR level only', () => {
    before(() => {
      LOG.level = LOG_LEVEL.ERROR;
    });

    it('should log on the ERROR level', () => {
      LOG.e('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });

    it('should not log on the WARN level', () => {
      LOG.w('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
    
    it('should not log on the INFO level', () => {
      LOG.i('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should not log on the DEBUG level', () => {
      LOG.d('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
  });
  
  describe('WARN level only', () => {
    before(() => {
      LOG.level = LOG_LEVEL.WARN;
    });

    it('should not log on the ERROR level', () => {
      LOG.e('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should log on the WARN level', () => {
      LOG.w('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });
    
    it('should not log on the INFO level', () => {
      LOG.i('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should not log on the DEBUG level', () => {
      LOG.d('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
  });
  
  describe('INFO level only', () => {
    before(() => {
      LOG.level = LOG_LEVEL.INFO;
    });

    it('should not log on the ERROR level', () => {
      LOG.e('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should not log on the WARN level', () => {
      LOG.w('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
    
    it('should log on the INFO level', () => {
      LOG.i('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });

    it('should not log on the DEBUG level', () => {
      LOG.d('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
  });
  
  describe('DEBUG level only', () => {
    before(() => {
      LOG.level = LOG_LEVEL.DEBUG;
    });

    it('should not log on the ERROR level', () => {
      LOG.e('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should not log on the WARN level', () => {
      LOG.w('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });
    
    it('should not log on the INFO level', () => {
      LOG.i('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.false;
    });

    it('should log on the DEBUG level', () => {
      LOG.d('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });
  });

  describe('ALL level on', () => {
    before(() => {
      LOG.level = LOG_LEVEL.ALL;
    });

    it('should log on the ERROR level', () => {
      LOG.e('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });

    it('should log on the WARN level', () => {
      LOG.w('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });
    
    it('should log on the INFO level', () => {
      LOG.i('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });

    it('should on the DEBUG level', () => {
      LOG.d('TEST', 'testing output string');
      expect(consoleSpy.called).to.be.true;
    });
  });

});