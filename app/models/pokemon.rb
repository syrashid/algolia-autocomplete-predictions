class Pokemon < ApplicationRecord
  include AlgoliaSearch

  algoliasearch do; end
end
