import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        
        // ✅ ADD DEBUG LOGS HERE
        console.log('USERNAME:', config.get('DB_USERNAME'));
        console.log('PASSWORD:', config.get('DB_PASSWORD'));

        return {
          type: 'oracle',
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          connectString: `//${config.get<string>('DB_HOST')}:${config.get<string>('DB_PORT')}/${config.get<string>('DB_SERVICE')}`,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}