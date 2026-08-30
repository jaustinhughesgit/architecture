# Decision 0113: Time-bucketed due pointers scale schedule dispatch

**Status:** Accepted and implemented in the clean platform; deployed scale proof remains pending.

Schedule meaning, immutable definitions, exact targets, and deterministic occurrence identities remain unchanged. Physical dispatch moves from indexing complete schedule/occurrence rows in a permanent fixed-shard GSI to a separate versioned v2 due-pointer projection.

Each active schedule or retryable occurrence owns one compact DynamoDB pointer partitioned by UTC minute and one of 64 deterministic virtual shards. Authoritative row and pointer changes are transactional. One shared EventBridge minute heartbeat performs constant work by sending one deduplicated FIFO task per virtual shard; it has no DynamoDB authority. FIFO groups serialize a shard while independent shard workers scale horizontally. Each worker queries only its newly closed buckets plus the open current bucket, and a durable monotonic cursor per shard provides bounded catch-up after downtime. Reads paginate with bounded parallelism; claims and occurrence-queue batches also use bounded parallelism. A cursor advances only after successful queue delivery. Deterministic identities and conditional claims make repeated bucket reads safe.

Chronological owner-list pointers avoid complete owner-partition reads. Operational occurrences and their list/due pointers expire after 90 days; invocation, effect, billing, and other audit evidence follow their independent retention contracts. No schedule contains protected plaintext and no per-user AWS Scheduler resource is created.

The storage layout carries its own version, so a future physical projection can be dual-written without changing schedule IDs, definitions, Paths, installations, or execution semantics. The former `ScheduleDueIndex` remains only for the separate publisher-withdrawal retry lifecycle.

Tests prove pointer distribution, 64 unique minute-shard dispatch tasks, time-bucket catch-up planning, transactional pointer creation, exact target loading without a GSI, infrastructure fan-out/partial-failure contracts, and three independent same-minute schedules claimed and executed through the scalable collection path. This is a structural scale proof, not a sustained million-execution throughput claim.
