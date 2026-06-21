import fs from 'fs';
import path from 'path';

const filesToCreate = {
  // --- HOMEPAGE ---
  'src/content/docs/index.mdx': `---
title: Welcome to DevNexus Architecture Hub
description: Advanced full-stack architecture deep dives, automation strategies, and machine learning infrastructure optimization blueprints.
template: splash
hero:
  tagline: Production-tested blueprints for modern microservices, QA frameworks, and ML workloads.
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Explore Architecture Guides
      link: /dev-nexus-hub/microservices/
      icon: right-arrow
      variant: primary
---
`,

  // --- LEGAL SECTION ---
  'src/content/docs/legal/about.md': `---
title: About the Author & Platform
description: Hands-on expertise behind DevNexus Architecture Hub.
---

Welcome to **DevNexus**. This platform is a dedicated engineering knowledge base focusing on high-throughput microservice patterns, resilient end-to-end testing systems, and optimized hardware pipelines for deep learning models.

### Engineering Expertise
The technical resources found across this platform are compiled from direct, hands-on production experiences, enterprise software internship implementations, and rigorous architectural testing. 

* **Backend Architectures:** Designing asynchronous communication frameworks using Java 25, Spring Boot 4.0.5, Apache Kafka, and Redis caching.
* **Automation Engineering:** Scaling automated UI and system integration test runners utilizing Playwright Page Object Models within enterprise Docker container lifecycles.
* **Machine Learning Infrastructure:** Developing hybrid anomaly detection systems and tuning execution parameters to extract peak CUDA execution speeds from mid-tier GPU architectures.
.
`,

  'src/content/docs/legal/privacy.md': `---
title: Privacy Policy
description: Privacy Policy and cookie utilization metrics for DevNexus Hub.
---

## 1. Data Collection & Cookie Disclosures
DevNexus Architecture Hub operates entirely as a statically generated informational resource deployed via GitHub Pages infrastructure. We do not maintain server-side databases or directly harvest tracking records.

## 2. Third-Party Advertising Systems
* We intend to utilize third-party ad delivery networks (such as Google AdSense) to display relevant advertisements during your site visits.
* These advertising services employ cookie tracking markers and automated web beacons to evaluate audience properties and serve contextually relevant ad components based on your historical browsing footprints.
* Users can fully control or deactivate personalized tracking criteria via internal browser cookie preferences or vendor opt-out dashboards.
`,

  // --- MICROSERVICES ---
  'src/content/docs/microservices/index.md': `---
title: High-Throughput Microservice Frameworks
description: Master event-driven stream architectures and distributed state caching patterns.
---

Distributed microservices demand robust decoupled design choices to scale seamlessly under heavy traffic conditions. This pillar hub aggregates deep-dive technical tutorials dealing with high-performance Java enterprise applications.

### Architectural Core Concepts

* **Asynchronous Message Passing:** Eliminating traditional thread-blocking REST clients by implementing message brokers to process high-volume operations gracefully.
* **Distributed State Management:** Leveraging low-latency in-memory data structures to shield your persistent database layer from recurring read spikes.

Select a technical blueprint from the sidebar or click below to begin:
* [Asynchronous Kafka Migration](/microservices/kafka-migration)
* [Distributed In-Memory Redis Caching](/microservices/redis-caching)
`,

  'src/content/docs/microservices/kafka-migration.md': `---
title: Asynchronous Kafka Migration in Spring Boot 4.0.5 Microservices
description: Step-by-step technical guide to migrating synchronous OpenFeign inter-service communication to event-driven Kafka message structures.
---

When scaling distributed systems, shifting from synchronous REST clients to event-driven architectures eliminates thread-blocking bottlenecks. This technical tutorial handles transforming standard communication networks into resilient, asynchronous message pipelines.

:::tip[AI Overview Snapshot]
To replace synchronous calls, disconnect direct consumer dependencies. Establish independent Kafka producers within your gateway engine, serialize your payloads into payload-optimized JSON records, and employ concurrent message listeners using structural configuration factories.
:::

## 1. Producer Stream Architecture Configuration

\`\`\`java
@Configuration
public class KafkaProducerConfig {

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
\`\`\`

## 2. Implementing Asynchronous Event Dispatching

Instead of waiting for a resource-heavy HTTP state change verification, emit an immutable event sequence straight to your broker pipeline:

\`\`\`java
@Service
public class OrderEventPublisher {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "orders-stream-topic";

    public void dispatchOrderCreatedEvent(OrderEventPayload payload) {
        this.kafkaTemplate.send(TOPIC, payload.getOrderId(), payload);
    }
}
\`\`\`
`,

  'src/content/docs/microservices/redis-caching.md': `---
title: Distributed In-Memory Redis Caching Patterns
description: Learn how to secure database layers using localized cache eviction routines and atomic data operations.
---

High-traffic transaction platforms require caching structures to minimize latency bottlenecks on relational databases. 

## 1. Cache Configuration Blueprint

\`\`\`java
@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(15))
            .disableCachingNullValues()
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }
}
\`\`\`

## 2. Implementing Safe Cache Interception

\`\`\`java
@Service
public class ProductService {

    @Cacheable(value = "products", key = "#id")
    public ProductResponse findProductById(Long id) {
        // Fallback method executes only if data does not exist inside Redis
        return database.findById(id).orElseThrow();
    }
}
\`\`\`
`,

  // --- QA AUTOMATION ---
  'src/content/docs/qa-automation/index.md': `---
title: Advanced QA Automation Engineering
description: Enterprise UI testing frameworks, robust locator strategies, and isolated test runtime containers.
---

Automated testing is the defensive wall of continuous integration pipelines. This section covers strategies to convert unstable browser interactions into high-fidelity, deterministic testing suites.

### Testing Specializations
* **Deterministic Locator Selection:** Bypassing vulnerable DOM text dependencies by leveraging structural and custom data properties.
* **Isolated Environment Testing:** Orchestrating headless test suites inside lightweight multi-stage environments.

Explore active blueprints:
* [Resolving Ant Design UI Locator Conflicts via Playwright](/qa-automation/locator-conflicts)
`,

  'src/content/docs/qa-automation/locator-conflicts.md': `---
title: Resolving Ant Design UI Locator Conflicts via Playwright
description: Advanced strategies to handle dynamically generated overlays, selectors, and nested layouts using Page Object Models.
---

Modern UI frameworks like Ant Design optimize component generation dynamically, which frequently creates duplicate locators or detached elements during automated end-to-end testing runs.

## 1. The Strategy: Strict Data Attributes over Layout Text

Avoid tracking elements through changing display labels. Instead, implement a robust Page Object Model utilizing targeted node filtering:

\`\`\`typescript
import { expect, type Locator, type Page } from '@playwright/test';

export class CustomerCreationPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly activeDropdownItem: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the button inside the precise wrapper container boundary
    this.submitButton = page.locator('.ant-form-item-control').locator('button:has-text("Submit")');
    this.activeDropdownItem = page.locator('.ant-select-item-option-content');
  }

  async selectDropdownValue(value: string) {
    // Wait for dynamic overlay to mount to DOM completely
    const targetOption = this.activeDropdownItem.filter({ hasText: value });
    await targetOption.waitFor({ state: 'visible' });
    await targetOption.click();
  }
}
\`\`\`
`,

  // --- MACHINE LEARNING ---
  'src/content/docs/machine-learning/index.md': `---
title: Applied Machine Learning Infrastructure
description: Optimizing data loader throughput, managing CUDA runtimes, and constructing hybrid evaluation pipelines.
---

Building intelligent tools requires managing physical resource limitations just as much as mathematical correctness. This hub deals with optimizing pipeline processing and evaluating multi-feature anomalies.

### Engineering Tracks
* **GPU Compute Maximization:** Eliminating data delivery bottlenecks between system RAM and local graphics cards.
* **Hybrid Classification Architectures:** Merging tree-based architectures with isolation metrics for anomaly discovery.

Explore implementation guides:
* [Optimizing CUDA Data Throughput](/machine-learning/cuda-performance)
`,

  'src/content/docs/machine-learning/cuda-performance.md': `---
title: Optimizing PyTorch DataLoader CUDA Throughput
description: Practical configurations to maximize VRAM utilization, configure pinned memory allocation, and eliminate GPU starvation barriers.
---

When training models on high-performance desktop graphics processors, the hardware's execution units often sit starved because the CPU cannot process and push dataset batches into the graphics memory fast enough.

## 1. High-Performance DataLoader Calibration

When preparing dataset loaders for compute-heavy processing loops (like managing large computer vision datasets), fine-tune your resource configuration properties explicitly:

\`\`\`python
import torch
from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset=training_dataset,
    batch_size=128,
    shuffle=True,
    num_workers=4,          # Adjust exactly matching physical CPU cores
    pin_memory=True,        # Allocates batches directly inside page-locked host memory
    drop_last=True          # Prevents execution bottlenecks on incomplete residual batches
)
\`\`\`

Using \`pin_memory=True\` speeds up the data transfer from CPU memory to GPU memory significantly, keeping your streaming processors constantly occupied with active computational cycles.
`,

  // --- PUBLIC AD NETWORKS ADS.TXT ---
  'public/ads.txt': `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
`
};

// Execution Block
console.log('🏗️ Starting automated SEO Architecture generation...');

Object.entries(filesToCreate).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, content.trim() + '\n');
  console.log(' ✅ Created: ' + filePath);
});

console.log('\n🚀 All SEO-optimized technical hubs, legal compliance records, and public file entries have been built successfully!');