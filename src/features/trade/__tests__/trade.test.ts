import { Trade } from '../domain/entities/Trade';
import { GetTrade } from '../domain/usecases/GetTrade';
import { TradeRepository } from '../domain/repositories/TradeRepository';
import { TradeParams, TradeSource, TradePeriod, HSCodeType } from '../../../types';
import { ok, err } from 'neverthrow';
import { ApiFailure } from '../../../core/failures';

describe('Trade Entity', () => {
  it('should create a trade with all fields', () => {
    const trade = new Trade(1234567.89, 9876.54, '0101', 'Tanjung Priok', 'Singapore', '2023');

    expect(trade.value).toBe(1234567.89);
    expect(trade.netWeight).toBe(9876.54);
    expect(trade.hsCode).toBe('0101');
    expect(trade.port).toBe('Tanjung Priok');
    expect(trade.country).toBe('Singapore');
    expect(trade.year).toBe('2023');
  });

  it('should convert to JSON correctly', () => {
    const trade = new Trade(1234567.89, 9876.54, '0101', 'Tanjung Priok', 'Singapore', '2023');

    const json = trade.toJson();

    expect(json.value).toBe(1234567.89);
    expect(json.netweight).toBe(9876.54);
    expect(json.kodehs).toBe('0101');
    expect(json.pod).toBe('Tanjung Priok');
    expect(json.ctr).toBe('Singapore');
    expect(json.tahun).toBe('2023');
  });

  it('should create from JSON correctly', () => {
    const json = {
      value: 1234567.89,
      netweight: 9876.54,
      kodehs: '0101',
      pod: 'Tanjung Priok',
      ctr: 'Singapore',
      tahun: '2023',
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(1234567.89);
    expect(trade.netWeight).toBe(9876.54);
    expect(trade.hsCode).toBe('0101');
    expect(trade.port).toBe('Tanjung Priok');
    expect(trade.country).toBe('Singapore');
    expect(trade.year).toBe('2023');
  });

  it('should handle missing fields by defaulting to empty/zero values', () => {
    const json = {};

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(0);
    expect(trade.netWeight).toBe(0);
    expect(trade.hsCode).toBe('');
    expect(trade.port).toBe('');
    expect(trade.country).toBe('');
    expect(trade.year).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      value: 500000,
      kodehs: '0102',
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(500000);
    expect(trade.netWeight).toBe(0);
    expect(trade.hsCode).toBe('0102');
    expect(trade.port).toBe('');
    expect(trade.country).toBe('');
    expect(trade.year).toBe('');
  });

  it('should handle string numbers by converting to number', () => {
    const json = {
      value: '1234567.89',
      netweight: '9876.54',
      kodehs: '0101',
      pod: 'Tanjung Priok',
      ctr: 'Singapore',
      tahun: '2023',
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(1234567.89);
    expect(trade.netWeight).toBe(9876.54);
    expect(trade.hsCode).toBe('0101');
    expect(trade.port).toBe('Tanjung Priok');
    expect(trade.country).toBe('Singapore');
    expect(trade.year).toBe('2023');
  });

  it('should handle numeric year by converting to string', () => {
    const json = {
      value: 1234567.89,
      netweight: 9876.54,
      kodehs: '0101',
      pod: 'Tanjung Priok',
      ctr: 'Singapore',
      tahun: 2023,
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(1234567.89);
    expect(trade.netWeight).toBe(9876.54);
    expect(trade.hsCode).toBe('0101');
    expect(trade.port).toBe('Tanjung Priok');
    expect(trade.country).toBe('Singapore');
    expect(trade.year).toBe('2023');
  });

  it('should handle empty string values correctly', () => {
    const json = {
      value: 0,
      netweight: 0,
      kodehs: '',
      pod: '',
      ctr: '',
      tahun: '',
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(0);
    expect(trade.netWeight).toBe(0);
    expect(trade.hsCode).toBe('');
    expect(trade.port).toBe('');
    expect(trade.country).toBe('');
    expect(trade.year).toBe('');
  });

  it('should handle large numeric values', () => {
    const json = {
      value: 999999999.99,
      netweight: 888888.88,
      kodehs: '999999',
      pod: 'Jakarta Port',
      ctr: 'United States',
      tahun: '2024',
    };

    const trade = Trade.fromJson(json);

    expect(trade.value).toBe(999999999.99);
    expect(trade.netWeight).toBe(888888.88);
    expect(trade.hsCode).toBe('999999');
    expect(trade.port).toBe('Jakarta Port');
    expect(trade.country).toBe('United States');
    expect(trade.year).toBe('2024');
  });
});

describe('GetTrade Use Case', () => {
  let mockRepository: jest.Mocked<TradeRepository>;
  let useCase: GetTrade;

  beforeEach(() => {
    mockRepository = {
      get: jest.fn(),
    } as jest.Mocked<TradeRepository>;
    useCase = new GetTrade(mockRepository);
  });

  it('should successfully get trade data from repository', async () => {
    const params: TradeParams = {
      source: TradeSource.Export,
      period: TradePeriod.Monthly,
      hsCode: '0101',
      hsType: HSCodeType.TwoDigit,
      year: '2023',
    };

    const mockData = {
      data: [
        {
          value: 1234567.89,
          netweight: 9876.54,
          kodehs: '0101',
          pod: 'Tanjung Priok',
          ctr: 'Singapore',
          tahun: '2023',
        },
      ],
      'data-availability': 'available',
    };

    mockRepository.get.mockResolvedValue(ok(mockData));

    const result = await useCase.execute(params);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(mockData);
    }
    expect(mockRepository.get).toHaveBeenCalledWith(params);
    expect(mockRepository.get).toHaveBeenCalledTimes(1);
  });

  it('should handle repository failure', async () => {
    const params: TradeParams = {
      source: TradeSource.Import,
      period: TradePeriod.Annually,
      hsCode: '0102',
      hsType: HSCodeType.Full,
      year: '2024',
    };

    const mockFailure = new ApiFailure('Not Found', 404);
    mockRepository.get.mockResolvedValue(err(mockFailure));

    const result = await useCase.execute(params);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toEqual(mockFailure);
    }
    expect(mockRepository.get).toHaveBeenCalledWith(params);
    expect(mockRepository.get).toHaveBeenCalledTimes(1);
  });

  it('should pass through all parameters to repository', async () => {
    const params: TradeParams = {
      source: TradeSource.Export,
      period: TradePeriod.Monthly,
      hsCode: '999999',
      hsType: HSCodeType.Full,
      year: '2025',
    };

    const mockData = { data: [], 'data-availability': 'available' };
    mockRepository.get.mockResolvedValue(ok(mockData));

    await useCase.execute(params);

    expect(mockRepository.get).toHaveBeenCalledWith(params);
  });

  it('should handle empty trade data response', async () => {
    const params: TradeParams = {
      source: TradeSource.Export,
      period: TradePeriod.Monthly,
      hsCode: '0101',
      hsType: HSCodeType.TwoDigit,
      year: '2023',
    };

    const mockData = { data: [], 'data-availability': 'available' };
    mockRepository.get.mockResolvedValue(ok(mockData));

    const result = await useCase.execute(params);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(mockData);
      expect(result.value.data).toEqual([]);
    }
  });
});
