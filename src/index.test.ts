import request from 'supertest';
import { describe, it, expect, vi, afterAll } from 'vitest';
import app from './index';

// A tiny fake payload the “remote” GraphQL server will return
const remotePayload = { salute: 'wholesome 🙌' };

describe('POST /gql', () => {
  const fetchMock = vi.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(remotePayload)
    })
  );

  vi.stubGlobal('fetch', fetchMock);
  afterAll(() => vi.restoreAllMocks());

  it('forwards the body and relays the remote response', async () => {
    const bodySent = { query: '{ hello }' };

    const res = await request(app).post('/gql').send(bodySent).expect(200);

    // 1. The response is passed through unchanged
    expect(res.body).toEqual(remotePayload);

    // 2. fetch was called once
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
