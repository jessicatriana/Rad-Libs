class RadLibTemplatesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index 
    templates = RadLibTemplate.all 
    render json: templates, only: [:id, :name, :content, :word_blank], inlcude: :completed_rad_libs
  end

  def show
    template = RadLibTemplate.find(params[:id])
    render json: template, only: [:id, :name, :content, :word_blank], inlcude: :completed_rad_libs
  end

  def create
    rad_lib = RadLibTemplate.create!(
      name: params[:rad_lib_template][:name], 
      content: params[:rad_lib_template][:content], 
      word_blank: params[:rad_lib_template][:word_blank]
    )
    # rad_lib.tap { |hs| hs.delete(:rad_lib_template) }
    render json: rad_lib, only: [:name, :content, :word_blank, :id]
  end

end
