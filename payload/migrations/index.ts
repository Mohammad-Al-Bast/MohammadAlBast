import * as migration_20261026_155640_initial from './20261026_155640_initial';
import * as migration_20261026_180351_add_project_categories from './20261026_180351_add_project_categories';
import * as migration_20261026_182115_add_project_code_snippet from './20261026_182115_add_project_code_snippet';

export const migrations = [
  {
    up: migration_20261026_155640_initial.up,
    down: migration_20261026_155640_initial.down,
    name: '20261026_155640_initial',
  },
  {
    up: migration_20261026_180351_add_project_categories.up,
    down: migration_20261026_180351_add_project_categories.down,
    name: '20261026_180351_add_project_categories',
  },
  {
    up: migration_20261026_182115_add_project_code_snippet.up,
    down: migration_20261026_182115_add_project_code_snippet.down,
    name: '20261026_182115_add_project_code_snippet'
  },
];
