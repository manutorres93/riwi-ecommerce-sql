import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './db-config';
import { User } from 'src/modules/users/entities/user.entity';

@Global()
@Module({
  imports: [
   /*  ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }), */
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db } = configService;

        return {
          type: 'mysql',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.password,
          database: db.name,
          entities: ['dist/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true, // Esto no debería estar en producción
          
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que esté disponible globalmente
})
export class PersistenceModule {
  
}
