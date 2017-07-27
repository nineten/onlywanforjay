class String
  def symbolize
    self.parameterize.underscore.to_sym
  end
end
