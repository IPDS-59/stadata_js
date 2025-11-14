/**
 * Statistical classification types
 */
export enum ClassificationType {
  /** KBLI 2009 - Klasifikasi Baku Lapangan Usaha Indonesia 2009 */
  KBLI_2009 = 'kbli2009',
  /** KBLI 2015 - Klasifikasi Baku Lapangan Usaha Indonesia 2015 */
  KBLI_2015 = 'kbli2015',
  /** KBLI 2017 - Klasifikasi Baku Lapangan Usaha Indonesia 2017 */
  KBLI_2017 = 'kbli2017',
  /** KBLI 2020 - Klasifikasi Baku Lapangan Usaha Indonesia 2020 (default) */
  KBLI_2020 = 'kbli2020',
  /** KBKI 2015 - Klasifikasi Baku Komoditas Indonesia 2015 */
  KBKI_2015 = 'kbki2015',
}

/**
 * KBLI Classification levels
 */
export enum KBLILevel {
  /** Category - Broadest level, single letter (A-U) */
  CATEGORY = 'kategori',
  /** Primary Group - Two-character code */
  PRIMARY_GROUP = 'golongan pokok',
  /** Group - Three-character code */
  GROUP = 'golongan',
  /** Sub Group - Four-character code */
  SUB_GROUP = 'subgolongan',
  /** Cluster - Most detailed, five-character code */
  CLUSTER = 'kelompok',
}

/**
 * KBKI Classification levels
 */
export enum KBKILevel {
  /** Section - Broadest level, 1-digit code */
  SECTION = 'seksi',
  /** Division - 2-digit code */
  DIVISION = 'divisi',
  /** Group - 3-digit code */
  GROUP = 'kelompok',
  /** Classes - 4-digit code */
  CLASSES = 'kelas',
  /** Sub Class - 5-digit code */
  SUB_CLASS = 'subkelas',
  /** Commodity Group - 7-digit code */
  COMMODITY_GROUP = 'kelompok komoditas',
  /** Commodity - Most detailed, 10-digit code */
  COMMODITY = 'komoditas',
}

/**
 * Union type for classification levels
 */
export type ClassificationLevel = KBLILevel | KBKILevel;

