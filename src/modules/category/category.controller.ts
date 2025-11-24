import { Auth, Public, User } from '@common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory';
@Controller('/category')
@Auth(["Admin"])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = this.categoryFactoryService.createCategory(
      createCategoryDto,
      user,
    );
    const createdCategory =await this.categoryService.create(category);
    return {message:"category created successfully ",success:true,date:{createdCategory}}
  }

  @Put(':id')
  async update(@Param('id') id: string,@Body() updateCategoryDto:UpdateCategoryDto,@User()user:any ) {
    const category =await this.categoryFactoryService.updateCategory(updateCategoryDto,id,user);
    const updatedCategory = await this.categoryService.update(id,category);
    return {message:"category updated successfully",success:true,data:updatedCategory}
  }
  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string){
    const category = await this.categoryService.findOne(id);
    return {success:true,data:category}
  }


}
